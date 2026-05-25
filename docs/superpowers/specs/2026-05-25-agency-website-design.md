# Agency Website — Design Specification

**Date**: 2026-05-25
**Project**: Software Solutions Agency Website (placeholder name: Atelier Studio)
**Status**: Approved, ready for implementation planning

---

## 1. Overview

A marketing and lead-generation website for a full-service software agency offering Web, Mobile, and AI/ML development to clients across all segments (startups, SMBs, and enterprise). The site must establish premium positioning, communicate expertise, and convert visitors into qualified leads.

**Primary goals**:
1. Communicate capability and credibility at a glance
2. Showcase past work with measurable outcomes
3. Capture qualified leads via a detailed contact form
4. Reflect a "craft-first" agency personality — not another generic tech startup site

---

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui |
| Language | TypeScript |
| Form validation | react-hook-form + zod |
| Fonts | Google Fonts (Playfair Display + DM Sans) |
| Deployment | Vercel |

---

## 3. Design System

### 3.1 Aesthetic Direction

**Minimal & Premium** — editorial luxury, not startup. The site reads like a high-end design studio or consultancy, not another purple-gradient SaaS landing page. Serif display typography against a deep forest green background is the defining contrast: sophisticated, calm, and confident.

### 3.2 Color Palette

```css
--color-bg:          #1a2e28;   /* deep forest green — primary background */
--color-bg-subtle:   #1f3830;   /* slightly lighter — cards, panels */
--color-bg-hover:    #243f38;   /* hover state for cards */
--color-linen:       #f4ede3;   /* warm linen — primary text */
--color-linen-dim:   #c4b9ab;   /* dimmed linen — secondary text, placeholders */
--color-copper:      #c8874a;   /* copper — primary accent, CTAs, emphasis */
--color-sage:        #7aaa8e;   /* sage green — secondary accent, tags, icons */
--color-border:      rgba(244, 237, 227, 0.1);  /* subtle border */
--color-border-focus: rgba(200, 135, 74, 0.5);  /* focused input border */
--color-error:       #e07a5f;   /* form validation errors */
```

### 3.3 Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display / Headlines | Playfair Display | 400, 700, 900 | Italic for emphasis words |
| Body / UI | DM Sans | 300, 400, 500, 600 | All labels, body copy, buttons |

**Typography scale (Tailwind CSS v4 custom properties)**:
- Hero headline: `clamp(44px, 5vw, 72px)`, tracking `-1px`, leading `1.08`
- Section title: `clamp(36px, 4vw, 56px)`, tracking `-0.5px`, leading `1.1`
- Sub-section title: `clamp(28px, 3vw, 40px)`
- Card title: `20–24px`
- Body: `14–16px`, weight 300, leading `1.75`
- Labels / eyebrows: `10–11px`, weight 500–600, `letter-spacing: 2–3px`, uppercase
- Buttons: `11–12px`, weight 600–700, `letter-spacing: 1.5–2px`, uppercase

**Italic copper emphasis pattern**: key words in Playfair Display headlines use `font-style: italic` + `color: var(--color-copper)` or `color: var(--color-sage)` for emphasis without bolding the entire headline.

### 3.4 Spacing & Layout

- Page horizontal padding: `60px` desktop, `24px` mobile
- Section vertical padding: `80px` top and bottom
- Grid gap for the 12-column portfolio grid: `1px` (hairline separators on `--color-border` background)
- Border style: `1px solid var(--color-border)` — used on section dividers, cards, inputs

### 3.5 Component Patterns

**Eyebrow label** (reused across every section):
```
[28px line in --color-sage]  [10px uppercase tracked text in --color-sage]
```

**Section number decoration**: Large Roman numerals (Playfair Display, 160–220px, opacity 4–5%) placed absolutely in card/panel backgrounds as decorative texture.

**Buttons**:
- Primary: `background: --color-copper`, `color: --color-bg`, `border-radius: 2px`, uppercase tracked
- Ghost: transparent, `color: --color-linen-dim`, arrow suffix, no border
- Outline: `border: 1px solid --color-border`, hover to copper border/text

**Tags / pills**:
- Service tags: sage border + sage text, 9px uppercase tracked, `border-radius: 2px`
- Project type pills (form): toggle selected state with copper bg tint + copper border

**Cards**: `background: --color-bg`, hover lifts to `--color-bg-hover`, `transition: background 0.2s`

---

## 4. Pages & Sections

### 4.1 Navigation (shared)

- Logo: `Atelier` in Playfair Display + copper period accent
- Links: Services (anchor to hero services panel `/#services`), Work (`/work`), About (`/about`) — 13px DM Sans, `--color-linen-dim`, hover to linen
- CTA: "Start a Project" — primary button, links to `/contact`
- `border-bottom: 1px solid --color-border`
- Note: "Insights" nav link is deferred to v2 (Blog page out of scope)

### 4.2 Hero Section (`/`)

**Layout**: Full-viewport split grid (`1fr 1fr`), divided by `1px` border.

**Left panel**:
- Eyebrow label: "Full-Service Software Agency"
- Headline (Playfair Display, 44–72px): "We craft software that *scales* with **your ambition.**"
- Subheading (DM Sans, 16px, weight 300): agency positioning statement, max 420px wide
- Actions: primary CTA ("Start a Project") + ghost link ("See our work →")
- Stats bar (separated by top border): 3 metrics — Projects Delivered, Years in Practice, Client Return Rate

**Right panel**:
- Label: "What we do" (eyebrow style)
- Services list: 4 numbered items (01–04), each with service name (Playfair Display 20px), 1-line description, hover arrow (→ slides right, turns copper)
- Decorative Roman numeral: absolute positioned, bottom-right, `opacity: 0.04`

**Bottom**: Ticker bar — flat horizontal list of capability tags separated by copper dots, `border-top: 1px solid --color-border`

### 4.3 Case Studies / Portfolio (`/work`)

**Layout**: 12-column asymmetric grid with `1px` hairline separators.

**Row 1**: Featured card (8 cols) + Side card (4 cols)
**Row 2**: Two half-width cards (6 cols each)

**Card anatomy**:
- Image area (16:9 for featured, 4:3 for side): placeholder with subtle gradient + abstract visual; service tags top-left
- Body: client segment label (copper, 10px uppercase), Playfair Display title with italic emphasis on outcome word, result metrics (Playfair numbers + uppercase labels)
- Hover: background lifts, arrow icon turns copper and shifts right

**Section header**:
- Left: eyebrow + section title ("Projects that *move* the needle.")
- Right: filter tabs — All / Web / Mobile / AI (pill style, active = copper bg)

**Footer**: full-width "View All Case Studies" link centered between two `1px` rules

### 4.4 About / Team (`/about`)

**Story section** (`1fr 1fr` split):

*Left panel*:
- Eyebrow + headline: "Built by builders, for *builders.*"
- 2-paragraph agency origin/values narrative
- 3 numbered values list (01, 02, 03): title (Playfair 17px) + 1-line description, separated by top borders

*Right panel*:
- Large typographic stat: "8+" in Playfair Display 100px + label "Years of craft"
- Manifesto pull-quote card: italic Playfair quote with sage emphasis word, copper attribution, frosted glass bg (`backdrop-filter: blur(4px)`)
- Decorative Roman numeral (bottom-right, `opacity: 0.05`)

**Team section**:
- Header: "The people who make it *happen.*" + team count (12 across 4 time zones)
- 4-column grid with `1px` hairlines
- Each card: avatar (56×56px, color-coded bottom accent bar in copper or sage), name (Playfair 18px), role (copper 11px uppercase), 2-line bio (DM Sans 12px, weight 300), skill tags

### 4.5 Contact / Lead Form (`/contact`)

**Layout**: `5fr 7fr` split.

**Left panel** (5fr):
- Eyebrow + headline: "Start your next *great* project."
- 2-sentence subheading
- 3 contact detail rows (email, location, hours): icon box + label + value
- Live status indicator: pulsing sage dot + "We typically respond within 4 hours"

**Right panel** (7fr):
- Form title: "Tell us about your project"
- **Project type selector**: pill toggle group — Web App, Mobile App, AI/Automation, Design System, Strategy Only, Not Sure Yet (multi-select, toggle on click)
- **Form fields** (react-hook-form + zod):
  - Row 1: Name (required) + Company (optional)
  - Row 2: Email (required, zod `.email()` validation, inline error) + Phone (optional)
  - Budget: custom slider — interactive track with copper fill gradient + thumb, displays formatted dollar value
  - Timeline: `<select>` dropdown
  - Project description: `<textarea>` (required, min 20 chars)
- **Submit button**: "Send Enquiry →" primary style
- **Privacy note**: 11px, links to Privacy Policy
- **Success state**: replaces form panel — checkmark circle (sage border), italic Playfair headline "Message received.", confirmation copy, back link

**Zod schema** (to implement):
```typescript
const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  company: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  projectTypes: z.array(z.string()).min(1, 'Please select at least one project type'),
  budget: z.number().min(5000),
  timeline: z.string(),
  message: z.string().min(20, 'Please describe your project (at least 20 characters)'),
})
```

---

## 5. Shared Patterns

### Radial background glow
Used in hero and contact left panel:
```css
background: radial-gradient(ellipse 60% 50% at 70% 50%, rgba(200,135,74,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 10% 80%, rgba(122,170,142,0.08) 0%, transparent 60%);
```

### Decorative Roman numerals
```css
font-family: Playfair Display; font-size: 160–220px; font-weight: 900;
color: rgba(122,170,142,0.04–0.05); position: absolute; bottom/right anchored;
```

### Hairline grid separators
Grid `gap: 1px` on `background: var(--color-border)` — creates visible `1px` lines between cells without explicit borders on each cell.

---

## 6. Responsive Breakpoints

| Breakpoint | Behaviour |
|---|---|
| `< 768px` | Single column on all split layouts; hero stats stack; team grid 2-col |
| `768–1024px` | Reduced font sizes via clamp; hero 1fr/1fr may collapse to stacked |
| `> 1024px` | Full desktop layout as designed |

---

## 7. Accessibility

- All color contrast ratios must meet WCAG AA (linen on forest green passes at large text; verify small text)
- Interactive elements (pills, cards, filters) must have visible `:focus-visible` states using `--color-border-focus`
- Form fields require `<label>` associations; error messages use `role="alert"`
- Images and decorative elements use appropriate `alt=""` or `aria-hidden="true"`

---

## 8. Out of Scope (v1)

- Blog / Insights page (can be added later)
- CMS integration
- Authentication
- Dark/light mode toggle (dark mode only for v1)
- Animations beyond hover states and form transitions

---

## 9. Open Questions (resolved)

- Agency name: **placeholder "Atelier Studio"** — swap at implementation time
- Font loading: Google Fonts via `next/font` (subset to used weights for performance)
- Form submission: server action or API route — implementation detail, not design concern
