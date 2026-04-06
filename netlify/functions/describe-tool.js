const Anthropic = require('@anthropic-ai/sdk');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  let url;
  try {
    ({ url } = JSON.parse(event.body || '{}'));
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  if (!url || !url.match(/^https?:\/\//i)) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid URL' }) };
  }

  // Fetch the page
  let html = '';
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; tool-describe-bot/1.0)' },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    html = await res.text();
  } catch (err) {
    return { statusCode: 200, headers, body: JSON.stringify({ error: 'Could not fetch page', name: '', desc: '' }) };
  }

  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim() : '';

  // Extract meta description
  const metaMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']{0,300})/i)
    || html.match(/<meta[^>]+content=["']([^"']{0,300})["'][^>]+name=["']description["']/i);
  const metaDesc = metaMatch ? metaMatch[1].trim() : '';

  // Extract first ~2500 chars of visible body text
  const bodyText = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 2500);

  // Auto-detect if it's an adam-tools deployed file
  const isDeployed = url.includes('adam-tools.netlify.app');
  const suggestedType = isDeployed ? 'Deployed file' : 'Built in Claude';

  // Call Claude to generate a smart description
  if (!process.env.ANTHROPIC_API_KEY) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ name: title, desc: metaDesc || bodyText.slice(0, 120), type: suggestedType }),
    };
  }

  try {
    const client = new Anthropic();
    const msg = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 180,
      messages: [{
        role: 'user',
        content: `You are writing a card description for a personal tools dashboard. Based on the webpage below, output a JSON object with two fields:
- "name": a short, clean tool name (2-5 words, title case, no domain names)
- "desc": 1 tight sentence describing what the tool actually does. Specific. No marketing language.

Page title: ${title}
Meta description: ${metaDesc}
Page text preview: ${bodyText.slice(0, 1200)}

Return only valid JSON. No markdown. No explanation.`,
      }],
    });

    let result = { name: title, desc: metaDesc || '', type: suggestedType };
    try {
      const parsed = JSON.parse(msg.content[0].text.trim());
      if (parsed.name) result.name = parsed.name;
      if (parsed.desc) result.desc = parsed.desc;
    } catch {
      // Claude returned non-JSON, use raw text as desc
      result.desc = msg.content[0].text.trim().slice(0, 160);
    }
    result.type = suggestedType;

    return { statusCode: 200, headers, body: JSON.stringify(result) };
  } catch (err) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ name: title, desc: metaDesc || bodyText.slice(0, 120), type: suggestedType }),
    };
  }
};
