// seed-canto-tools.js
// Run this in the browser console at adam-tools.netlify.app
// It sets the console_tools_canto localStorage key with the full Canto tool list.
// Paste the entire contents of this file into the console and press Enter.

(function () {
  var tools = [
    {
      id: Math.random().toString(36).slice(2) + Date.now().toString(36),
      name: 'Master Partner Plan 2026',
      url: 'https://adam-tools.netlify.app/canto-master-plan-2026.html',
      desc: 'Complete FY2026 partner acquisition plan — monthly calendar, full strategy, and partner prospecting with scored agencies and outreach sequences.',
      category: 'Strategy',
      type: 'Deployed file',
      created: Date.now()
    },
    {
      id: Math.random().toString(36).slice(2) + Date.now().toString(36),
      name: 'Integration Marketplace',
      url: 'https://adam-tools.netlify.app/canto-marketplace-v5.html',
      desc: '36+ integration cards across E-Commerce, CMS, PIM, Social, and ERP. ICP context per card, partner program tab, integration request modal.',
      category: 'Sales Tools',
      type: 'Deployed file',
      created: Date.now()
    },
    {
      id: Math.random().toString(36).slice(2) + Date.now().toString(36),
      name: 'Integration Survey',
      url: 'https://adam-tools.netlify.app/canto-integration-survey.html',
      desc: 'Internal rep survey to prioritize integration development, recruit partners, and build an internal business case. CSV export for Excel.',
      category: 'Sales Tools',
      type: 'Deployed file',
      created: Date.now()
    },
    {
      id: Math.random().toString(36).slice(2) + Date.now().toString(36),
      name: 'Partner Eval Tool',
      url: 'https://adam-tools.netlify.app/partner-tool-v2.html',
      desc: '13 agencies and SIs scored on ICP overlap, DAM/PIM conversations, and referral willingness. Full outreach sequences for top 5.',
      category: 'Sales Tools',
      type: 'Deployed file',
      created: Date.now()
    },
    {
      id: Math.random().toString(36).slice(2) + Date.now().toString(36),
      name: 'Month-by-Month Plan',
      url: 'https://adam-tools.netlify.app/canto-monthly-plan-2026.html',
      desc: 'Full Q2–Q4 calendar with events, experience formats (dinners, roundtables, happy hours), weekly priorities, and pipeline targets per month.',
      category: 'Strategy',
      type: 'Deployed file',
      created: Date.now()
    },
    {
      id: Math.random().toString(36).slice(2) + Date.now().toString(36),
      name: 'Full Partner Plan',
      url: 'https://adam-tools.netlify.app/canto-partner-plan-2026.html',
      desc: 'Complete strategic plan with Q2/Q3/Q4 breakdowns, travel schedule from AUS, creative activations, partner × event matrix, checklist, and budget.',
      category: 'Strategy',
      type: 'Deployed file',
      created: Date.now()
    },
    {
      id: Math.random().toString(36).slice(2) + Date.now().toString(36),
      name: 'Monday.com Intake',
      url: 'https://adam-tools.netlify.app/canto-monday-intake-v3.html',
      desc: 'Pre-filled event request forms for all 9 events. Click any field to copy and paste directly into your Monday board. Includes Glossy Beauty Summit.',
      category: 'Internal',
      type: 'Deployed file',
      created: Date.now()
    },
    {
      id: Math.random().toString(36).slice(2) + Date.now().toString(36),
      name: 'Partner Submit Form',
      url: 'https://adam-tools.netlify.app/canto-partner-submit.html',
      desc: 'Partner intake and submission form for the Canto integration partner program.',
      category: 'Partner Program',
      type: 'Deployed file',
      created: Date.now()
    }
  ];

  localStorage.setItem('console_tools_canto', JSON.stringify(tools));
  console.log('%c✓ Canto tools seeded (' + tools.length + ' tools)', 'color:#4ade80;font-weight:bold;font-size:14px');
  console.log('Refresh the page to see them in The Console → Canto → Tools.');
})();
