# Adam-Tools · Canto Integration Marketplace Standards

## Target Audiences
- **Sales Reps** → Marketplace UI (`canto-marketplace-v5.html`)
- **Developer Partners** → Integration Docs / `INTEGRATION_SPEC.md` files

## Design Aesthetic
- **Editorial/Premium** — no generic "AI slop" styling
- High-contrast typography with distinctive serif/sans pairings
- Intentional whitespace; every element earns its place
- Reference: think Stripe Docs, Linear, Vercel — not Bootstrap defaults

## Required Data Fields Per Integration
Every integration entry must include all of the following:
| Field | Description |
|---|---|
| `category` | PIM, CMS, E-Commerce, Feed, ESP, Storage, Social, CRM, ERP, Creative, Tech Partner |
| `dataFlow` | `unidirectional` or `bidirectional` |
| `authType` | OAuth 2.0, API Key, Webhook, Native Connector, etc. |
| `partnerDeveloper` | Who builds/maintains it: Canto, Tech Partner, SI, TBD |
| `salesValueProp` | One-sentence sales-facing value proposition |

## Workflow Rules
1. **Always run `/brainstorming` (Superpowers skill) before modifying the marketplace app.**
2. **Generate a separate `INTEGRATION_SPEC.md`** for every scoped integration — this is the developer handoff doc.
3. Keep sales language and developer language separated — never mix jargon audiences in the same component.

## File Map
| File | Purpose |
|---|---|
| `canto-marketplace-v5.html` | Sales-facing marketplace UI |
| `index.html` | Main dashboard (entry point) |
| `partner-eval-tool.html` | Partner targeting/evaluation |
| `partner-tool-v2.html` | Partner targeting + outreach sequences |
| `canto-partner-plan-2026.html` | FY2026 partner marketing plan |
| `canto-monthly-plan-2026.html` | Month-by-month partner plan |
| `canto-monday-intake-v3.html` | Monday.com event intake form |
| `INTEGRATION_SPEC.md` | (Generated per integration — developer handoff) |
