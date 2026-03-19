# Design Spec: Canto Integration Marketplace Redesign
**Date:** 2026-03-18
**Status:** Approved
**Author:** Adam (via brainstorming session)

---

## Problem Statement

The current marketplace (`canto-marketplace-v5.html`) is not usable by the sales team. Issues:
1. Cards don't tell the story fast enough — reps click into everything to get the point
2. Too techy/developer-facing — needs to feel like a sales tool
3. Cluttered and dense — too much competing for attention
4. Not premium enough — doesn't match Canto.com quality

---

## Target Audience
Sales reps who need to answer "can we integrate with X?" in under 60 seconds and know whether they can close it on Canto's paper.

---

## Design Principles
- **Canto.com Native** — match canto.com visual language: navy, orange, clean white cards, real integration logos from Canto CDN
- **Sales-first hierarchy** — most commercially important info (Sold by Canto, Live status) is first
- **Scannable without clicking** — a rep can answer 3 questions from the card: what does it do, can I sell it, how hard is it

---

## Complete Data Schema

Every integration object contains the following fields. Fields marked **NEW** are additions; others exist in current code.

### Identity
| Field | Type | Values / Notes |
|---|---|---|
| `id` | string | Unique slug e.g. `'shopify'` — also used as CDN logo slug |
| `name` | string | Display name e.g. `'Shopify'` |
| `cat` | string enum | `'pim'` · `'cms'` · `'ecommerce'` · `'feed'` · `'esp'` · `'storage'` · `'social'` · `'crm'` · `'erp'` · `'creative'` · `'tech'` |
| `catLabel` | string | Human label e.g. `'E-Commerce'` — shown on card below name and in modal header |
| `catBg` | string | Hex background for logo fallback tile and category pill background |
| `catColor` | string | Hex text color for logo fallback initial and category pill text |
| `emoji` | string | Fallback character used only if CDN logo fails AND no catBg/catColor defined |

### Category → Color Map (catBg / catColor)
| cat | catBg | catColor |
|---|---|---|
| `tech` | `#EFF6FF` | `#1E40AF` |
| `creative` | `#FFF0EB` | `#E34400` |
| `pim` | `#EEF2FF` | `#4F46E5` |
| `cms` | `#EBF5FF` | `#0070C0` |
| `ecommerce` | `#E6F5F0` | `#008060` |
| `feed` | `#F5F3FF` | `#6D28D9` |
| `esp` | `#FFFBEB` | `#B45309` |
| `storage` | `#EBF4FF` | `#0078D4` |
| `social` | `#E8F5E9` | `#2E7D32` |
| `crm` | `#E8F2FA` | `#005B99` |
| `erp` | `#E5F2FB` | `#007DB8` |

### Status & Availability
| Field | Type | Values / Notes |
|---|---|---|
| `availability` | string enum | `'live'` · `'soon'` · `'track'` |
| `featured` | boolean | `true` = shows ⭐ Top Pick ribbon on card + sorts to top in Top Picks filter |

### Commercial (NEW + clarified)
| Field | Type | Values / Notes |
|---|---|---|
| `soldBy` | string enum **NEW** | `'canto'` · `'partner'` · `'si'` — drives Sold By badge on card and quick filter |
| `investment` | string | Free text, max display ~20 chars inline: `'Included in plan'` · `'Contact us'` · `'Custom quote'` · `'Partnership Agreement'` |
| `includedInPlan` | boolean **NEW** | `true` when `investment === 'Included in plan'` — drives "Included in Plan" quick filter |

### Integration Details (NEW + clarified)
| Field | Type | Values / Notes |
|---|---|---|
| `dataFlow` | string enum **NEW** | `'canto-to-platform'` · `'platform-to-canto'` · `'bidirectional'` |
| `authType` | string enum **NEW** | `'OAuth 2.0'` · `'API Key'` · `'Native Connector'` · `'Webhook'` · `'TBD'` — if `'TBD'`, render as `—` in modal Deal Details |
| `difficulty` | string enum **NEW** | `'easy'` · `'medium'` · `'difficult'` — replaces freetext `complexity` field |
| `timeline` | string | Free text max 12 chars for card inline: `'~1 week'` · `'3–4 weeks'` · `'8–12 weeks'` · `'Included'` · `'TBD'` |

### Partner
| Field | Type | Values / Notes |
|---|---|---|
| `partnerType` | string enum | `'canto'` · `'tech'` · `'si'` — **drives the "Built By" sidebar filter only**. Completely independent from `soldBy`. Both fields can coexist on the same record without conflict (e.g., `partnerType: 'tech', soldBy: 'partner'` is valid). The `soldBy` field always and exclusively drives the Sold By badge; `partnerType` never overrides it. |
| `partner` | string | Display name of who built/maintains it: `'Canto'` · `'Feedonomics'` · `'Partner SI'` etc. |
| `partnerDesc` | string | 1–2 sentence description of the partner |
| `partnerBg` | string \| undefined | Hex color for the partner name chip in the modal Partner section. Fallback if absent: use `catBg` of the record. |

### catLabel Defined Values
| cat | catLabel |
|---|---|
| `tech` | `'Tech Partner'` |
| `creative` | `'Creative Workflow'` |
| `pim` | `'PIM'` |
| `cms` | `'CMS'` |
| `ecommerce` | `'E-Commerce'` |
| `feed` | `'Feed Management'` |
| `esp` | `'Email & Marketing'` |
| `storage` | `'Cloud Storage'` |
| `social` | `'Social & Publishing'` |
| `crm` | `'CRM'` |
| `erp` | `'ERP'` |

### dataFlow Display String Mapping
| dataFlow value | Card / modal display string |
|---|---|
| `'canto-to-platform'` | `Canto → [name]` |
| `'platform-to-canto'` | `[name] → Canto` |
| `'bidirectional'` | `Canto ⇄ [name]` |

### Sales Content
| Field | Type | Values / Notes |
|---|---|---|
| `tagline` | string | One sentence, rep-facing, customer outcome focused. Max 2 lines on card. |
| `icp` | string | "Best For" — who this integration is for |
| `signals` | string[] | "Listen For" phrases e.g. `['We use Shopify', 'Images are outdated']` |
| `talktrack` | string | Copyable rep script — plain text, no markdown, no smart quotes |
| `problem` | string | The problem it solves — 2–4 sentences |
| `capabilities` | string[] | Feature chip labels e.g. `['Product Image Sync', 'Auto-update on DAM Change']` |
| `recruit` | string \| undefined | Tech partner recruitment strategy. Present only on `cat === 'tech'` records; `undefined` (omitted) on all others. Modal renders section only if value is truthy. |

---

## Section 1: Card Anatomy

```
┌─────────────────────────────────────────────┐
│  [LOGO]  Shopify                      ● Live │
│          E-Commerce                          │
│                                              │
│  Push approved product images directly to    │
│  Shopify — auto-updates when DAM changes.    │
│                                              │
│  Canto → Shopify  │  Easy  │  ~1 week       │
├─────────────────────────────────────────────┤
│  ✦ Sold by Canto   ·   Built by Canto    →  │
└─────────────────────────────────────────────┘
```

### Card Element Specifications

**Logo:** Load from `https://d2zjq3qbslq56w.cloudfront.net/integrations/[id].svg` using the record's `id` field as the slug (e.g. `id: 'shopify'` → `integrations/shopify.svg`). On load error (`onerror`), replace with a 42×42px square, background `catBg`, text = first character of `name` uppercased, color `catColor`, DM Sans 700, 18px, centered.

**Status badge:** Top-right of card. Dot (6px circle) + label. Colors defined in Section 3.

**Description:** Rendered from `tagline` field. Max 2 lines, truncate with ellipsis. 13px, muted color.

**Data flow label:** Rendered from `dataFlow`:
- `'canto-to-platform'` → `Canto → [name]`
- `'platform-to-canto'` → `[name] → Canto`
- `'bidirectional'` → `Canto ⇄ [name]`

**Difficulty pill:** Rendered from `difficulty` field. Colors in Section 3.

**Timeline:** Plain text from `timeline` field. Shown next to difficulty pill.

**Sold by badge:** Bottom footer, left side. Rendered from `soldBy` field. Colors and labels in Section 3.

**Built by:** Bottom footer, right side. Plain text from `partner` field.

**Arrow icon:** `→` character, 14px, color `#9CA3AF`. Positioned in bottom footer row, flex end (rightmost element). On card hover: `transform: translateX(3px)` over 150ms ease, color changes to `#D95A00`.

**Featured ribbon:** When `featured === true`, a small `⭐ Top Pick` ribbon renders `position: absolute; top: 0; right: 16px` on the card, hanging from the top edge (border-radius 0 0 6px 6px). This is visually separate from the availability badge which sits inside the card's flex layout (not absolutely positioned), so they do not conflict. On a `featured + live` card: the ribbon hangs from top-right corner; the `● Live` badge sits in the top-right of the card's content area below the ribbon.

**Hover state:** `transform: translateY(-2px)`, `border-left: 3px solid #D95A00`, `box-shadow` increases to `0 8px 32px rgba(217,90,0,0.10)`.

### Default Card Sort Order
Cards render in the order they appear in the `INTEGRATIONS` array. When `featured === true`, those cards sort to the top of any filtered or searched view.

### Empty / Zero Results State
When filters + search return zero cards: centered message with magnifying glass icon, "No integrations match" heading, "Try clearing a filter or searching differently" subtext, and a "Clear filters" button that resets all active filters.

---

## Section 2: Page Layout

```
┌─────────────────────────────────────────────────────────┐
│  HEADER (sticky, top:0, height:56px)                    │
│  Canto logo  |  Integration Marketplace  ← Dashboard   │
├─────────────────────────────────────────────────────────┤
│  HERO (navy gradient, not sticky)                       │
│  "Connect Canto to every tool in your deal"             │
│  Stats: [34 Integrations][8 Included][4,500+ Customers] │
│         [11 Categories]                                 │
├─────────────────────────────────────────────────────────┤
│  SEARCH + QUICK FILTERS (sticky, top:56px)              │
│  [ Search input                    ]  N results         │
│  [ ✦ Sold by Canto ] [ ● Live ] [ ⇄ Bidirectional ]    │
│  [ Easy ] [ Included in Plan ] [ ⭐ Top Picks ]         │
├───────────────┬─────────────────────────────────────────┤
│  SIDEBAR      │  GRID                                   │
│  (228px wide, │                                         │
│  sticky       │  "All Integrations"    34 integrations  │
│  top: 56px +  │  [Card] [Card] [Card]                   │
│  search bar   │  [Card] [Card] [Card]                   │
│  height)      │                                         │
│               │                                         │
│  Categories   │                                         │
│               │                                         │
│  Built By     │                                         │
└───────────────┴─────────────────────────────────────────┘
```

**Hero stats (4 values):**
1. Total integration count (dynamic, counts `INTEGRATIONS.length`)
2. Included in plan count (dynamic, counts `includedInPlan === true`)
3. `4,500+` Customers (static)
4. Category count (dynamic, counts unique `cat` values)

**Sticky offset:** Header = `top: 0`. Search/filter bar = `top: 56px`. Sidebar = `top: 56px + search bar height` (search bar height ≈ 88px, so sidebar `top: 144px`). These are calculated at runtime via JS `offsetHeight` on the search bar element to handle any reflow.

**Quick filter logic (AND):** "Sold by Canto" → `soldBy === 'canto'`. "Live" → `availability === 'live'`. "Bidirectional" → `dataFlow === 'bidirectional'`. "Easy" → `difficulty === 'easy'`. "Included in Plan" → `includedInPlan === true`. "Top Picks" → `featured === true`.

**Mobile (< 768px):** Sidebar collapses to a horizontal scrollable pill row above the grid. Sticky search bar remains.

---

## Section 3: Badge & Color System

### Sold By (soldBy field → badge)
| Field value | Badge label | Color | Hex |
|---|---|---|---|
| `'canto'` | `✦ Sold by Canto` | Orange | `#D95A00` bg, white text |
| `'partner'` | `◈ Partner License` | Slate | `#475569` bg, white text |
| `'si'` | `◎ SI Engagement` | Purple | `#7C3AED` bg, white text |

### Status (availability field → badge)
| Field value | Badge label | Dot color | Text color |
|---|---|---|---|
| `'live'` | `● Live` | `#059669` | `#059669` |
| `'soon'` | `● Coming Soon` | `#D97706` | `#D97706` |
| `'track'` | `● Partnership Track` | `#2563EB` | `#2563EB` |

Status badges use light background (field color at 10% opacity) + colored dot + colored text. No filled background.

### Difficulty (difficulty field → pill)
| Field value | Label | Background | Text |
|---|---|---|---|
| `'easy'` | `Easy` | `#ECFDF5` | `#059669` |
| `'medium'` | `Medium` | `#FFFBEB` | `#D97706` |
| `'difficult'` | `Difficult` | `#FEF2F2` | `#DC2626` |

### Data Flow Labels
Plain dark text (`#374151`), 12px, rendered inline with difficulty and timeline, separated by `·`.

---

## Section 4: Modal / Detail View

Triggered by clicking any card. Full-screen overlay with blur backdrop. Max width 640px, max height 90vh, scrollable.

### Modal Header (sticky within modal)
```
[LOGO 50px]  [Name 19px bold]           [● Live] [✦ Sold by Canto]
             [catLabel · dataFlow label]                        [✕]
```

### Modal Body Sections (in order)

1. **Best For** — green box, renders `icp`
2. **Listen For** — amber chips, renders `signals` array as pills prefixed with `💬`
3. **Talk Track** — navy box, renders `talktrack`. Section header row is flex with label left and Copy button right (not absolutely positioned). On copy: clipboard API writes `talktrack` string → button label changes to "✓ Copied" → toast element is appended to `document.body` (NOT inside the modal) with `position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%); z-index: 9999`. This placement outside the modal prevents stacking context clipping from the modal's backdrop `backdrop-filter`. Toast slides in, text "Talk track copied", disappears after 2.5s. Multiple rapid clicks reset the 2.5s timer; no duplicate toasts.
4. **The Problem** — plain section, renders `problem`
5. **Recruitment Strategy** — blue box, renders `recruit`. Only shown when `cat === 'tech'`
6. **Capabilities** — chip grid, renders `capabilities` array
7. **Partner** — orange box, renders `partner` name + `partnerDesc`
8. **Deal Details** — compact meta row: "Built by [partner]" · difficulty pill · timeline string · investment string · authType (renders `—` if `'TBD'`) · data flow label. `partner` also appears in section 7; this row is an intentional quick-scan summary.

### Modal Interactions
- Click outside overlay → close
- `Escape` key → close
- Copy button → clipboard API, toast, 2.5s reset

---

## What Stays the Same
- All 34 existing integrations (data enriched, not replaced)
- Search against name, tagline, catLabel, partner, icp, signals
- Dashboard back link
- Sales Cheat Sheet print view (updated to include new columns)
- Keyboard shortcut `/` to focus search

---

## Design Reference
- Font: DM Sans (existing, no change)
- Brand navy: `#0F1B2D`
- Brand orange: `#D95A00`
- Logo CDN: `https://d2zjq3qbslq56w.cloudfront.net/integrations/[slug].svg`
- Reference site: canto.com
