# EcoSphere — ESG Management Platform · UI/UX Design Prompts

A single reference file containing structured design prompts for every page/module of
the **EcoSphere ESG Management Platform**, plus a marketing landing page.
Use these prompts with any AI design or code-generation tool (v0, Lovable, Figma AI,
Cursor, Kiro, etc.) to build a fresh, premium ESG dashboard based on the design.

> ESG = **E**nvironmental, **S**ocial, **G**overnance. EcoSphere lets organizations
> track emissions, run CSR programs, manage compliance, gamify sustainability, and
> generate reports — all from one dashboard.

---

## How to Use This File

1. Pick the module you want to build.
2. Copy its prompt block into your design/codegen tool.
3. **Always paste the Global Design System block first** so every page shares the
   same dark theme, color-coding, and components.
4. Attach the reference screenshot/`.excalidraw` export alongside the prompt for
   pixel-accurate results.

---

## Global Design System (paste this before any page prompt)

```
Design a modern, dark-themed, data-dense web application called "EcoSphere",
an ESG (Environmental, Social, Governance) Management Platform.

Brand & tone:
- Enterprise sustainability / ESG analytics tool.
- Feel: fresh, premium, trustworthy, data-forward — clean and airy, not cluttered.

Theme: Fresh, modern "eco" look. Light mode is the primary experience, with a
refined dark mode available. Avoid flat pure-black; use soft, layered surfaces.

--- LIGHT MODE (primary) ---
- App background: soft off-white / mint tint (#F6F9F7).
- Surfaces/cards: pure white (#FFFFFF) with 1px hairline borders (#E5EAE8)
  and soft, diffuse shadows (e.g. 0 1px 3px rgba(16,24,40,0.06)).
- Sidebar: deep forest gradient (#0F3D2E → #13543E) with light text — gives the
  app a premium, branded feel without being flat black.
- Text: charcoal (#1A2B23) primary, slate gray (#5B6B63) secondary.
- Brand primary: emerald (#10B981); brand deep: forest (#065F46).

--- DARK MODE (secondary) ---
- App background: deep desaturated green-navy (#0B1512), NOT pure black.
- Surfaces/cards: elevated slate-green (#152420) with borders (#25352F).
- Text: soft white (#E8F0EC) primary, muted (#8FA69B) secondary.

--- MODULE ACCENT COLORS (tabs, badges, buttons, chart series) ---
Use gentle gradients + soft tinted backgrounds for badges (10–15% opacity of the
accent) rather than solid heavy blocks, so the UI feels light and premium:
    - Environmental → emerald green   (#10B981, tint bg #D1FADF)
    - Social        → ocean blue      (#3B82F6, tint bg #DBEAFE)
    - Governance    → royal purple     (#8B5CF6, tint bg #EDE9FE)
    - Gamification  → warm amber/orange (#F59E0B, tint bg #FEF3C7)
    - Reports       → teal/cyan         (#14B8A6, tint bg #CCFBF1)
    - Settings      → slate/neutral     (#64748B, tint bg #F1F5F9)

--- STATUS COLORS (use soft tinted pill badges: colored text on light tint bg) ---
- Success / Compliant / On Track → green  (#15803D on #DCFCE7)
- Warning / Under Review / At Risk → amber (#B45309 on #FEF3C7)
- Danger / Non-Compliant / High Risk → red (#B91C1C on #FEE2E2)
- Info / Neutral → blue (#1D4ED8 on #DBEAFE)

Typography:
- Font: "Inter". Headings semibold; body 13–14px; compact line-height for density.

Layout & components:
- App shell = left sidebar (collapsible, grouped nav) + top module tab bar + content area.
- Small radius (6–10px), thin borders, subtle shadows, tight 8px spacing grid.
- Reusable components: score cards, KPI cards, colored pill badges, progress bars,
  data tables (sortable, status column, row actions), tab bars, filter dropdowns,
  search inputs, toggle switches, line & bar charts, buttons (primary/secondary/ghost).
- Accessible: WCAG AA contrast on dark, focus states, aria labels, keyboard nav.
- Responsive: sidebar collapses to icons/hamburger; tables reflow to cards on mobile.

Tech intent (if generating code):
- React + TypeScript + Tailwind CSS + Recharts (or Chart.js) for charts.
```

### App Shell (shared across all modules)

```
Every authenticated module shares this shell:

TITLE BAR (top):
- App name "EcoSphere: ESG Management Platform" with a one-line subtitle.

LEFT SIDEBAR (dark, collapsible, grouped nav with expandable sub-items):
- Dashboard
- Environmental (▸ Emission Tracking, Product Life Cycle, Carbon Management, ...)
- Social
- Governance
- Gamification
- Reports (▸ Standard Reports, Custom Report Builder, ...)
- Settings (▸ Organization, Configuration, Notification Settings, ...)
- Active item highlighted with the module accent color.

MODULE TAB BAR (top of content area, present on each page):
- Horizontal tabs: Dashboard | Environmental | Social | Governance |
  Gamification | Reports | Settings.
- Active tab uses the module's accent color underline/fill.

CONTENT AREA:
- Section heading with an icon, then the module-specific content below.
```

---

## 1. Landing Page (with Header & Footer)

```
Design a marketing landing page for "EcoSphere", an ESG Management Platform.
Follow the Global Design System (fresh eco palette: light off-white/mint
surfaces, emerald brand, soft shadows, module accent colors).

HEADER (sticky top navigation bar):
- Left: EcoSphere logo (leaf/globe mark) + wordmark.
- Center: nav links — Features, Modules, Pricing, Resources, About.
- Right: "Log in" ghost button + "Get Started" green primary button.
- Sticky on scroll with subtle border/shadow; collapses to a hamburger on mobile.

MAIN SECTIONS (top to bottom):
1. Hero: bold headline ("Manage your entire ESG program in one place"),
   supporting subtext, primary + secondary CTA, and a screenshot/mockup of the
   dark EcoSphere dashboard on the right.
2. Trusted-by logo strip.
3. Modules grid: 5–6 cards mirroring the platform's pillars —
   Environmental (green), Social (blue), Governance (purple),
   Gamification (orange), Reports (teal), each with icon + short description.
4. Feature highlight: split section — emissions line chart + ESG scoring copy.
5. How it works: 3-step numbered flow (Connect data → Track & engage → Report).
6. Testimonials: quote cards with avatar, name, role, company.
7. Pricing preview: 3 tiers (Starter, Growth, Enterprise) with feature lists + CTA.
8. Final CTA banner: full-width gradient, headline + "Get Started" button.

FOOTER (full width, multi-column, dark):
- Column 1: logo, one-line description, social icons (X, LinkedIn, GitHub, YouTube).
- Column 2: Product — Environmental, Social, Governance, Gamification, Reports.
- Column 3: Company — About, Careers, Blog, Contact.
- Column 4: Resources — Docs, Help Center, Community, Status.
- Column 5: Newsletter signup with email input + Subscribe button.
- Bottom bar: © copyright, Privacy Policy, Terms of Service, Cookie settings.
- Responsive: columns stack vertically on mobile.
```

---

## 2. Authentication (Login / Sign Up)

```
Design authentication screens for EcoSphere following the Global Design System
(fresh eco palette; forest-gradient brand panel on the left).

- Split layout: left panel with brand imagery + tagline, right panel with the form.
- LOGIN: email, password, "remember me", "forgot password" link,
  green "Log in" button, SSO/social login, link to sign up.
- SIGN UP: organization name, full name, work email, password + strength meter,
  terms checkbox, "Create account" button, link to log in.
- FORGOT PASSWORD: email input + "Send reset link", back-to-login link.
- Inline validation, loading and error states. Fully responsive.
```

---

## 3. Dashboard — Executive Overview

```
Design the "Dashboard: Executive Overview" page for EcoSphere.
Follow the Global Design System and App Shell. Active tab: Dashboard.

CONTENT:
- Row of 4 ESG SCORE CARDS, each with a colored accent and value out of 10.0:
    - Environmental Score (green)  e.g. 7.8 / 10.0
    - Social Score (blue)          e.g. 7.4 / 10.0
    - Governance Score (purple)    e.g. 8.5 / 10.0
    - Overall ESG Score (teal)     e.g. 8.1 / 10.0
  Each card: label, big number, small trend/subtext.
- Two charts side by side:
    - "Emissions Trend Over the Months" — line/area chart with markers (green series).
    - "Governance ESG Ranking" — vertical bar chart (blue series).
- Bottom row, split into two panels:
    - "Recent Activity" feed: list items each with a colored status dot + text + time.
    - "Quick Actions" panel: stacked buttons — "New Report" (green),
      "Start Challenge" (orange), "View Reports" (blue).
- Dense but organized grid; reflows to single column on mobile.
```

---

## 4. Environmental — Emission Tracking & Goals

```
Design the "Environmental: Emission Tracking & Goals" page for EcoSphere.
Follow the Global Design System and App Shell. Accent: green. Active tab: Environmental.

CONTENT:
- Toolbar row: filter dropdown(s) (e.g. Product/Site/Scope), a search input,
  and a green "Add Entry" primary button with edit/delete icon actions.
- DATA TABLE of emission entries with columns such as:
  Emission Source | Department | Scope | Target CO2 | Current CO2 | Progress | Duration | Status.
    - Progress column shows a green progress bar with %.
    - Status column shows pill badges (e.g. "On Track" green, "At Risk" amber).
    - Row actions: edit, delete.
- Pagination footer.
- Optional: goal summary cards above the table.
- Table reflows to stacked cards on mobile.
```

---

## 5. Social — CSR & Employee Engagement

```
Design the "Social: CSR & Employee Engagement" page for EcoSphere.
Follow the Global Design System and App Shell. Accent: blue. Active tab: Social.

CONTENT:
- Row of 4 STAT CARDS, each with an icon, value, and label (blue accent):
    - Volunteer Hours
    - CSR Donations
    - Events Hosted
    - Staff Wellness
  Each card may include a small "View / Add" action button.
- "Program Progress" / initiatives section with progress bars.
- DATA TABLE of initiatives with columns like:
  Initiative | Category | Participants | Points | Status.
    - Status pill badges (blue/green).
- "Add Initiative" and "Export" buttons.
- Responsive grid; table reflows to cards on mobile.
```

---

## 6. Governance — Policies, Audits & Compliance

```
Design the "Governance: Policies, Audits & Compliance" page for EcoSphere.
Follow the Global Design System and App Shell. Accent: purple. Active tab: Governance.

CONTENT:
- Toolbar: filter dropdown, purple "Add Policy" button, "Report" button.
- POLICIES TABLE with columns such as:
  Policy | Owner | Category | Last Review | Next Review | Status.
    - Status pill badges: "Compliant" (green), "Under Review" (amber),
      "Non-Compliant" (red).
- RISK REGISTER section below: table with
  Risk | Level | Likelihood | Impact | Owner columns.
    - Level badges: High (red), Medium (amber), Low (green).
- Row actions (edit/view). Pagination. Responsive → cards on mobile.
```

---

## 7. Gamification — Challenges, Badges & Leaderboard

```
Design the "Gamification: Challenges, Badges & Leaderboard" page for EcoSphere.
Follow the Global Design System and App Shell. Accent: orange. Active tab: Gamification.

CONTENT:
- Category filter chips row (e.g. All, Energy, Waste, Commute, Water).
- Row of 3 CHALLENGE CARDS (orange accent), each with:
  icon, title (e.g. "Sustainability Sprint", "Recycle Challenge",
  "Commute Green Week"), short description, participants/points,
  a progress bar, and an orange "Join Challenge" button.
- "Badges Earned" row: circular badge icons with labels.
- "Leaderboard" section: ranked table with
  Rank | User/Team | Points | Trend, top ranks highlighted.
- Responsive: cards stack, table reflows on mobile.
```

---

## 8. Reports — Analytics & Custom Report Builder

```
Design the "Reports: Analytics & Custom Report Builder" page for EcoSphere.
Follow the Global Design System and App Shell. Accent: teal. Active tab: Reports.

CONTENT:
- Row of 4 REPORT-TYPE CARDS, each with icon, title, description, and a
  "Generate" button:
    - Environmental Report
    - Social Report
    - Governance Report
    - ESG Summary
- "Custom Report Builder" panel below:
    - Dropdowns to pick data source, date range, metrics, grouping.
    - Preview area.
    - Export buttons: "Export PDF", "Export Excel", "Export CSV".
- Responsive grid; controls stack on mobile.
```

---

## 9. Settings — Configuration & Administration

```
Design the "Settings: Configuration & Administration" page for EcoSphere.
Follow the Global Design System and App Shell. Accent: neutral. Active tab: Settings.

CONTENT:
- "Organization Settings" section:
    - Toolbar with search, "Add Organization" button, edit/delete actions.
    - TABLE with columns: Name | Users | Role | Permissions | Status.
      Status pill badges (green/amber).
- "ESG Configuration & Notifications" section:
    - Grouped TOGGLE SWITCHES with labels/descriptions, e.g.:
      "Enable auto emission calculation", "Require reviewer for all ESG entries",
      "Send email badges on challenge complete", "Email alerts for compliance issues".
- Sticky save bar with unsaved-changes indicator.
- Responsive: table reflows to cards; toggles stack on mobile.
```

---

## 10. Supporting States (apply to every module)

```
Design shared supporting states for EcoSphere (fresh eco palette):

- Notifications panel: dropdown/drawer, grouped by date, read/unread styling,
  "mark all as read".
- Empty states: illustration + message + primary CTA for each table/list.
- Loading states: skeleton rows/cards matching each layout.
- 404 and 500 error pages: illustration, message, "Back to dashboard" button.
- Toasts for save/error/success actions.
```

---

## Consistency Checklist

- [ ] Fresh eco palette: light off-white/mint bg, white cards, forest-gradient
      sidebar (with a refined dark mode option) — no flat pure-black.
- [ ] Module accent colors applied consistently: Environmental=green, Social=blue,
      Governance=purple, Gamification=orange, Reports=teal, Settings=neutral.
- [ ] Shared app shell: left grouped sidebar + top module tab bar.
- [ ] Consistent components: score/stat cards, pill status badges, progress bars,
      data tables with row actions, toggle switches, charts.
- [ ] Landing page has sticky header + multi-column footer.
- [ ] Responsive at mobile / tablet / desktop (sidebar collapses, tables → cards).
- [ ] Accessible: AA contrast on dark, focus states, aria labels, keyboard nav.
- [ ] Empty, loading, and error states for every data view.

---

> Tip: For pixel-accurate output, attach the EcoSphere design screenshot or the
> `.excalidraw` export alongside the relevant prompt block above.
