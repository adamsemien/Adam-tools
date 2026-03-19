# Marketplace Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `canto-marketplace-v5.html` into a premium, sales-first integration marketplace matching Canto.com's visual design, with real CDN logos, Sold by Canto badges, data flow indicators, and difficulty ratings.

**Architecture:** Single HTML file. All styles inline in `<style>`. All data in a `const INTEGRATIONS` JS array. All logic in `<script>`. No build step, no dependencies beyond Google Fonts.

**Tech Stack:** HTML5, CSS custom properties, vanilla JS (ES6+), DM Sans from Google Fonts, Canto CDN for integration logos.

**Spec:** `docs/superpowers/specs/2026-03-18-marketplace-redesign-design.md`

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `canto-marketplace-v5.html` | **Modify** | Entire marketplace — styles, data, markup, logic |

---

## Task 1: Enrich All 34 Integration Data Records

**File:** `canto-marketplace-v5.html` — `const INTEGRATIONS` array (lines ~469–740)

Add 5 new fields to every integration record. Replace the old `complexity` freetext field with the new `difficulty` enum.

**New fields per record:**
```js
soldBy: 'canto' | 'partner' | 'si',
dataFlow: 'canto-to-platform' | 'platform-to-canto' | 'bidirectional',
authType: 'OAuth 2.0' | 'API Key' | 'Native Connector' | 'Webhook' | 'TBD',
difficulty: 'easy' | 'medium' | 'difficult',
includedInPlan: true | false,   // true when investment contains "Included"
```

**Field values by integration:**

| id | soldBy | dataFlow | authType | difficulty | includedInPlan |
|---|---|---|---|---|---|
| salsify-tp | partner | bidirectional | TBD | medium | false |
| akeneo-tp | partner | bidirectional | TBD | medium | false |
| shopify-tp | partner | canto-to-platform | TBD | medium | false |
| klaviyo-tp | partner | canto-to-platform | TBD | medium | false |
| adobe-tp | partner | bidirectional | TBD | medium | false |
| mindcloud-tp | partner | bidirectional | API Key | easy | false |
| workato-tp | partner | bidirectional | API Key | medium | false |
| salsify | partner | canto-to-platform | API Key | medium | false |
| akeneo | canto | canto-to-platform | Native Connector | easy | true |
| inriver | si | canto-to-platform | API Key | medium | false |
| adobe-cc | canto | bidirectional | Native Connector | easy | true |
| figma | partner | canto-to-platform | OAuth 2.0 | medium | false |
| contentful | canto | bidirectional | Native Connector | easy | true |
| wordpress | canto | canto-to-platform | Native Connector | easy | true |
| drupal | si | canto-to-platform | API Key | difficult | false |
| shopify | canto | canto-to-platform | OAuth 2.0 | easy | true |
| bigcommerce | partner | canto-to-platform | API Key | medium | false |
| feedonomics | partner | canto-to-platform | API Key | medium | false |
| channable | partner | canto-to-platform | API Key | medium | false |
| hubspot-mktg | canto | canto-to-platform | OAuth 2.0 | easy | true |
| klaviyo | partner | canto-to-platform | API Key | medium | false |
| sharepoint | canto | bidirectional | OAuth 2.0 | easy | true |
| gdrive | partner | bidirectional | OAuth 2.0 | easy | false |
| sprout | partner | canto-to-platform | OAuth 2.0 | easy | false |
| hootsuite | partner | canto-to-platform | OAuth 2.0 | medium | false |
| salesforce | canto | canto-to-platform | Native Connector | easy | true |
| sap | si | canto-to-platform | API Key | difficult | false |
| netsuite | si | canto-to-platform | API Key | difficult | false |

- [ ] **Step 1:** Add `soldBy`, `dataFlow`, `authType`, `difficulty`, `includedInPlan` fields to every record in the `INTEGRATIONS` array using the table above.
- [ ] **Step 2:** Verify count — the array should still have 34 records. Open browser console: `INTEGRATIONS.length` should return `34`.
- [ ] **Step 3:** Verify no record is missing `soldBy` — console: `INTEGRATIONS.filter(i => !i.soldBy).length` should return `0`.

---

## Task 2: Replace CSS — Canto.com Native Design System

**File:** `canto-marketplace-v5.html` — entire `<style>` block

Replace the full `<style>` block with the new design system. Key changes vs current:

- New badge classes: `.badge-sold-canto`, `.badge-sold-partner`, `.badge-sold-si`
- Status badges use light-bg + colored dot/text (not filled)
- Difficulty pills: `.pill-easy`, `.pill-medium`, `.pill-difficult`
- Card footer gets `.card-footer-top` (data flow + difficulty + timeline) and `.card-footer-bottom` (sold by badge + built by + arrow)
- Real logo `<img>` with `.logo-img` class + `.logo-fallback` div for error case
- Featured ribbon: `.featured-ribbon` (position absolute)
- Hover: `translateY(-2px)`, orange left border

**CSS variables to keep:**
```css
:root {
  --orange: #D95A00;
  --orange-light: #FF7A2E;
  --orange-bg: #FFF3EC;
  --navy: #0F1B2D;
  --navy-mid: #1E3352;
  --text: #111827;
  --text-2: #374151;
  --muted: #6B7280;
  --border: #E5E7EB;
  --bg: #F9FAFB;
  --white: #FFFFFF;
  --sidebar-w: 228px;
}
```

**New badge CSS to add:**
```css
/* SOLD BY BADGES */
.badge-sold { font-size:11px; font-weight:700; padding:3px 9px; border-radius:4px; color:white; white-space:nowrap; display:inline-flex; align-items:center; gap:4px; }
.badge-sold-canto  { background: #D95A00; }
.badge-sold-partner { background: #475569; }
.badge-sold-si     { background: #7C3AED; }

/* STATUS BADGES */
.badge-status { font-size:11px; font-weight:600; padding:3px 9px; border-radius:20px; display:inline-flex; align-items:center; gap:5px; white-space:nowrap; }
.badge-status .dot { width:6px; height:6px; border-radius:50%; background:currentColor; }
.badge-live    { background:#ECFDF5; color:#059669; }
.badge-soon    { background:#FFFBEB; color:#D97706; }
.badge-track   { background:#EFF6FF; color:#2563EB; }

/* DIFFICULTY PILLS */
.pill { font-size:11px; font-weight:600; padding:2px 8px; border-radius:4px; }
.pill-easy      { background:#ECFDF5; color:#059669; }
.pill-medium    { background:#FFFBEB; color:#D97706; }
.pill-difficult { background:#FEF2F2; color:#DC2626; }

/* CARD LOGO */
.logo-wrap { width:44px; height:44px; border-radius:10px; overflow:hidden; flex-shrink:0; }
.logo-img  { width:100%; height:100%; object-fit:contain; padding:6px; }
.logo-fallback { width:44px; height:44px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700; font-family:'DM Sans',sans-serif; flex-shrink:0; }

/* FEATURED RIBBON */
.featured-ribbon { position:absolute; top:0; right:16px; background:var(--orange); color:white; font-size:9px; font-weight:800; padding:3px 8px 4px; letter-spacing:0.5px; text-transform:uppercase; border-radius:0 0 6px 6px; z-index:1; }
```

- [ ] **Step 1:** Replace the full `<style>` block with the new styles (keep all existing styles that are not being replaced, add the new badge/pill/logo/ribbon classes above).
- [ ] **Step 2:** Open in browser — verify page loads without layout breaks.

---

## Task 3: Update Page Layout HTML

**File:** `canto-marketplace-v5.html` — body markup (header, hero, search section, sidebar)

**3a — Header:** Add `← Dashboard` link in header-left (already exists from previous build — verify it's present).

**3b — Hero stats:** Update the stats section to show 4 stats dynamically rendered:
```html
<div class="stat"><div class="stat-num" id="statTotal">—</div><div class="stat-label">Integrations</div></div>
<div class="stat"><div class="stat-num" id="statIncluded">—</div><div class="stat-label">Included in Plan</div></div>
<div class="stat"><div class="stat-num">4,500+</div><div class="stat-label">Customers</div></div>
<div class="stat"><div class="stat-num" id="statCategories">—</div><div class="stat-label">Categories</div></div>
```
JS populates `statTotal`, `statIncluded`, `statCategories` on init.

**3c — Quick filter pills:** Replace existing quick filter row with:
```html
<div class="quick-filters">
  <span class="qf-label">Quick filters:</span>
  <button class="qf-btn" id="qf-canto-sold"   onclick="toggleQF('canto-sold',this)">✦ Sold by Canto</button>
  <button class="qf-btn" id="qf-live"          onclick="toggleQF('live',this)">● Live</button>
  <button class="qf-btn" id="qf-bidirectional" onclick="toggleQF('bidirectional',this)">⇄ Bidirectional</button>
  <button class="qf-btn" id="qf-easy"          onclick="toggleQF('easy',this)">Easy</button>
  <button class="qf-btn" id="qf-included"      onclick="toggleQF('included',this)">Included in Plan</button>
  <button class="qf-btn" id="qf-featured"      onclick="toggleQF('featured',this)">⭐ Top Picks</button>
</div>
```

**3d — Sidebar Built By filter:** Update labels to match new `partnerType` values:
```html
<button class="pt-btn active" onclick="setPT('all',this)">All</button>
<button class="pt-btn" onclick="setPT('canto',this)">Canto-built</button>
<button class="pt-btn" onclick="setPT('tech',this)">Tech partner</button>
<button class="pt-btn" onclick="setPT('si',this)">System integrator</button>
```

- [ ] **Step 1:** Update hero stats HTML (add 4th stat, use dynamic IDs).
- [ ] **Step 2:** Replace quick filter pills HTML with new set (Sold by Canto first).
- [ ] **Step 3:** Verify sidebar Built By buttons match `partnerType` values.
- [ ] **Step 4:** Open in browser — verify layout is intact.

---

## Task 4: Rebuild Card Render Function

**File:** `canto-marketplace-v5.html` — `renderCards()` function and supporting helpers

Replace the `renderCards()` function with a new version that:
1. Renders CDN logo with fallback
2. Shows sold by badge (bottom footer)
3. Shows data flow label
4. Shows difficulty pill + timeline
5. Sorts featured cards to top
6. Updates hero stats on every render

**Helper functions to add:**

```js
function dataFlowLabel(i) {
  if (i.dataFlow === 'canto-to-platform')   return `Canto → ${i.name}`;
  if (i.dataFlow === 'platform-to-canto')   return `${i.name} → Canto`;
  if (i.dataFlow === 'bidirectional')        return `Canto ⇄ ${i.name}`;
  return '';
}

function soldByBadgeHTML(soldBy) {
  const map = {
    canto:   ['badge-sold badge-sold-canto',   '✦ Sold by Canto'],
    partner: ['badge-sold badge-sold-partner', '◈ Partner License'],
    si:      ['badge-sold badge-sold-si',      '◎ SI Engagement'],
  };
  const [cls, label] = map[soldBy] || map.partner;
  return `<span class="${cls}">${label}</span>`;
}

function statusBadgeHTML(av) {
  const map = {
    live:  ['badge-status badge-live',  '● Live'],
    soon:  ['badge-status badge-soon',  '● Coming Soon'],
    track: ['badge-status badge-track', '● Partnership Track'],
  };
  const [cls, label] = map[av] || map.live;
  return `<span class="${cls}"><span class="dot"></span>${label.replace('● ','')}</span>`;
}

function difficultyPillHTML(diff, timeline) {
  const map = {
    easy:      'pill pill-easy',
    medium:    'pill pill-medium',
    difficult: 'pill pill-difficult',
  };
  const label = diff ? diff.charAt(0).toUpperCase() + diff.slice(1) : '';
  const cls = map[diff] || 'pill';
  return `<span class="${cls}">${label}</span>${timeline ? `<span class="timeline-text">${timeline}</span>` : ''}`;
}

function logoHTML(i) {
  const cdnUrl = `https://d2zjq3qbslq56w.cloudfront.net/integrations/${i.id}.svg`;
  const fallbackStyle = `background:${i.catBg};color:${i.catColor}`;
  return `<div class="logo-wrap">
    <img class="logo-img" src="${cdnUrl}"
      onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
      alt="${i.name}">
    <div class="logo-fallback" style="${fallbackStyle};display:none">${i.name.charAt(0)}</div>
  </div>`;
}
```

**New card template in renderCards():**
```js
grid.innerHTML = filtered.map((i, idx) => `
  <div class="card${i.featured ? ' is-featured' : ''}${i.availability === 'soon' ? ' is-soon' : ''}"
    style="animation-delay:${Math.min(idx*40,300)}ms"
    onclick="openModal('${i.id}')">
    ${i.featured ? '<div class="featured-ribbon">⭐ Top Pick</div>' : ''}
    <div class="card-top">
      ${logoHTML(i)}
      <div class="card-top-right">
        ${statusBadgeHTML(i.availability)}
      </div>
    </div>
    <div class="card-name">${i.name}</div>
    <div class="card-cat-label">${i.catLabel}</div>
    <div class="card-tagline">${i.tagline}</div>
    <div class="card-flow-row">
      <span class="flow-label">${dataFlowLabel(i)}</span>
      ${difficultyPillHTML(i.difficulty, i.timeline)}
    </div>
    <div class="card-footer">
      ${soldByBadgeHTML(i.soldBy)}
      <span class="built-by">Built by ${i.partner}</span>
      <span class="card-arrow">→</span>
    </div>
  </div>
`).join('');
```

**Hero stat updates in renderCards():**
```js
document.getElementById('statTotal').textContent = INTEGRATIONS.length;
document.getElementById('statIncluded').textContent = INTEGRATIONS.filter(i => i.includedInPlan).length;
document.getElementById('statCategories').textContent = new Set(INTEGRATIONS.map(i => i.cat)).size;
```

**Featured sort (add before grid render):**
```js
filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
```

- [ ] **Step 1:** Add the 5 helper functions (`dataFlowLabel`, `soldByBadgeHTML`, `statusBadgeHTML`, `difficultyPillHTML`, `logoHTML`) above `renderCards()`.
- [ ] **Step 2:** Replace the `grid.innerHTML = filtered.map(...)` block in `renderCards()` with the new card template.
- [ ] **Step 3:** Add featured sort before the grid render.
- [ ] **Step 4:** Add hero stat updates at the start of `renderCards()`.
- [ ] **Step 5:** Open in browser — verify cards show logos (or fallback initials), sold-by badges, data flow labels, difficulty pills.
- [ ] **Step 6:** Console check: click a card with `soldBy: 'canto'` — badge should be orange. Click one with `soldBy: 'si'` — badge should be purple.

---

## Task 5: Update Filter Logic

**File:** `canto-marketplace-v5.html` — `toggleQF()` and `renderCards()` filter section

**Update `toggleQF()` key names to match new button IDs:**
```js
function toggleQF(key, el) {
  if (activeQF.has(key)) { activeQF.delete(key); el.classList.remove('active'); }
  else { activeQF.add(key); el.classList.add('active'); }
  renderCards();
}
```

**Update filter logic in `renderCards()`:**
```js
let filtered = INTEGRATIONS.filter(i => {
  if (activeCat !== 'all' && i.cat !== activeCat) return false;
  if (activePT  !== 'all' && i.partnerType !== activePT) return false;
  if (activeQF.has('canto-sold')   && i.soldBy !== 'canto') return false;
  if (activeQF.has('live')         && i.availability !== 'live') return false;
  if (activeQF.has('bidirectional')&& i.dataFlow !== 'bidirectional') return false;
  if (activeQF.has('easy')         && i.difficulty !== 'easy') return false;
  if (activeQF.has('included')     && !i.includedInPlan) return false;
  if (activeQF.has('featured')     && !i.featured) return false;
  if (q) {
    const hay = [i.name, i.tagline, i.catLabel, i.partner, i.icp||'', (i.signals||[]).join(' ')].join(' ').toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
});
```

- [ ] **Step 1:** Update `toggleQF()` function.
- [ ] **Step 2:** Replace the filter logic block in `renderCards()`.
- [ ] **Step 3:** Browser test: click "✦ Sold by Canto" filter — only orange-badged cards should show. Count should drop.
- [ ] **Step 4:** Browser test: click "Included in Plan" — verify only integrations with `includedInPlan: true` show.
- [ ] **Step 5:** Browser test: stack "Sold by Canto" + "Easy" — should show only Canto-built easy integrations.
- [ ] **Step 6:** Browser test: activate all filters + type nonsense in search — empty state should show with "Clear filters" button.

---

## Task 6: Update Modal

**File:** `canto-marketplace-v5.html` — `openModal()` function

Update the modal to show:
- `soldBy` badge in header (next to status badge)
- `dataFlow` label in header subtitle
- `authType` in Deal Details row (renders `—` if `'TBD'`)
- Deal Details row format: `Built by [partner] · [difficulty pill] · [timeline] · [investment] · [authType] · [dataFlow]`

**Updated modal header HTML in `openModal()`:**
```js
document.getElementById('mLogo').innerHTML = logoHTML(i);
document.getElementById('mName').textContent = i.name;
document.getElementById('mCat').textContent = `${i.catLabel} · ${dataFlowLabel(i)}`;
document.getElementById('mBadges').innerHTML = statusBadgeHTML(i.availability) + ' ' + soldByBadgeHTML(i.soldBy);
```

**Updated Deal Details section (replace existing meta row):**
```js
html += `<div class="modal-meta">
  <div class="meta-item"><div class="meta-label">Built by</div><div class="meta-value">${i.partner}</div></div>
  <div class="meta-item"><div class="meta-label">Difficulty</div><div class="meta-value">${difficultyPillHTML(i.difficulty, '')}</div></div>
  <div class="meta-item"><div class="meta-label">Timeline</div><div class="meta-value">${i.timeline}</div></div>
  <div class="meta-item"><div class="meta-label">Investment</div><div class="meta-value">${i.investment}</div></div>
  <div class="meta-item"><div class="meta-label">Auth</div><div class="meta-value">${i.authType === 'TBD' ? '—' : (i.authType || '—')}</div></div>
  <div class="meta-item"><div class="meta-label">Data Flow</div><div class="meta-value">${dataFlowLabel(i)}</div></div>
</div>`;
```

- [ ] **Step 1:** Update the `openModal()` function — update header assignments to use `logoHTML(i)`, add `soldByBadgeHTML` to `mBadges`, update `mCat` to include data flow.
- [ ] **Step 2:** Replace the `modal-meta` row with the 6-field Deal Details row above.
- [ ] **Step 3:** Browser test: open a Canto-built integration (e.g. Shopify) — header should show `● Live` + `✦ Sold by Canto` side by side.
- [ ] **Step 4:** Browser test: open a tech partner (e.g. Salsify PIM) — header should show `◈ Partner License`.
- [ ] **Step 5:** Browser test: open Figma (authType: 'OAuth 2.0') — Auth row shows "OAuth 2.0". Open a TBD authType — Auth row shows "—".

---

## Task 7: Polish & Cheat Sheet Update

**File:** `canto-marketplace-v5.html`

**7a — Update Cheat Sheet print table** to include new columns:
```js
tbody.innerHTML = INTEGRATIONS.map(i =>
  `<tr>
    <td>${i.name}</td>
    <td>${i.catLabel}</td>
    <td style="max-width:180px">${i.tagline}</td>
    <td>${dataFlowLabel(i)}</td>
    <td>${i.soldBy === 'canto' ? '✦ Yes' : '—'}</td>
    <td>${i.difficulty || '—'}</td>
    <td>${i.timeline}</td>
    <td>${i.investment}</td>
  </tr>`
).join('');
```

Update print table `<thead>` to match:
```html
<tr>
  <th>Integration</th><th>Category</th><th>What It Does</th>
  <th>Data Flow</th><th>Sold by Canto</th>
  <th>Difficulty</th><th>Timeline</th><th>Cost</th>
</tr>
```

**7b — CSS additions for new card elements** (`.card-cat-label`, `.card-flow-row`, `.flow-label`, `.timeline-text`, `.built-by`):
```css
.card-cat-label { font-size:11px; color:var(--muted); font-weight:500; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px; }
.card-flow-row  { display:flex; align-items:center; gap:8px; margin-bottom:12px; flex-wrap:wrap; }
.flow-label     { font-size:12px; color:var(--text-2); font-weight:500; }
.timeline-text  { font-size:11px; color:var(--muted); }
.built-by       { font-size:11px; color:var(--muted); flex:1; text-align:right; }
```

- [ ] **Step 1:** Add the `.card-cat-label`, `.card-flow-row`, `.flow-label`, `.timeline-text`, `.built-by` CSS classes to the `<style>` block.
- [ ] **Step 2:** Update the cheat sheet `<thead>` HTML.
- [ ] **Step 3:** Update the `openCheatSheet()` function JS to use the new `tbody` template.
- [ ] **Step 4:** Open cheat sheet — verify 8 columns show correctly, "Sold by Canto" column shows ✦ Yes for Canto records.
- [ ] **Step 5:** Final full-page browser test:
  - [ ] All cards render without errors
  - [ ] CDN logos load for integrations with known slugs (shopify, akeneo, wordpress, etc.)
  - [ ] Fallback initials show for integrations without CDN logos
  - [ ] "✦ Sold by Canto" filter works
  - [ ] Featured cards show ribbon and sort to top
  - [ ] Modal opens with correct badges in header
  - [ ] Talk track copy works (toast appears)
  - [ ] Escape closes modal
  - [ ] Cheat sheet opens and prints

---

## Execution Notes

- This is a single HTML file — no build step, no npm, no tests to run beyond browser verification.
- Open the file directly: `open /Users/adamsemien/Desktop/Adam-tools/canto-marketplace-v5.html`
- Browser console (`Cmd+Option+J`) for JS verification steps.
- Commit after each task completes successfully.
