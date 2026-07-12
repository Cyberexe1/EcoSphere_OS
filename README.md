# EcoSphere — ESG Management Platform

EcoSphere is a web application for managing an organization's **ESG** (Environmental,
Social, Governance) program. It brings emissions tracking, CSR and employee
engagement, compliance and governance, gamification, and reporting together in a
single, clean dashboard — built around the idea of "Data Transparency for a Greener
Future."

This repository contains the **frontend** (React + Vite) along with the original
design references used to build it.

---

## Features

- **Marketing landing page** — sticky floating header, hero, modules grid, feature
  highlight, how-it-works, testimonials, pricing, and a multi-column footer.
- **Authentication** — login and sign-up pages with a split brand layout, inline
  validation, password visibility toggle, and a password-strength meter.
- **Demo login** — a built-in demo account so you can explore the dashboard without a
  backend.
- **Protected dashboard** — an Executive ESG Overview with score cards, an emissions
  trend chart, a governance ranking benchmark, a recent-activity feed, and quick
  actions.
- **Responsive** — adapts across mobile, tablet, and desktop (collapsible sidebar,
  reflowing grids).

---

## Tech Stack

- **React 18** with **Vite 6** (fast dev server + build)
- **React Router 7** for client-side routing
- **Tailwind CSS 3** with a custom "Eco" design token theme
- **Inter** font + **Material Symbols** icons

---

## Getting Started

Prerequisites: **Node.js 18+** and npm.

```bash
cd frontend
npm install
npm run dev
```

The dev server prints a local URL (default http://localhost:5173). Open it in your
browser.

### Available scripts (run inside `frontend/`)

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the Vite development server            |
| `npm run build`   | Build the production bundle into `dist/`     |
| `npm run preview` | Preview the production build locally         |

---

## Demo Login

The app ships with a demo account (frontend-only, no backend required):

- **Email:** `demo@ecosphere.com`
- **Password:** `EcoSphere@2024`

On the login page you can click **Autofill** to populate these fields, then log in to
reach the dashboard. Authentication state is stored in `localStorage`, and the
`/dashboard` route is protected — visiting it while logged out redirects to `/login`.

> Note: this is demo-only auth for previewing the UI. Replace it with a real backend
> and secure session handling before any production use.

---

## Routes

| Path         | Page                | Access    |
| ------------ | ------------------- | --------- |
| `/`          | Landing page        | Public    |
| `/login`     | Login               | Public    |
| `/signup`    | Sign up             | Public    |
| `/dashboard` | Executive Overview  | Protected |

---

## Project Structure

```
Ecosphere/
├─ frontend/                        # React + Vite application
│  ├─ index.html
│  ├─ package.json
│  ├─ tailwind.config.js            # Custom "Eco" color + typography tokens
│  ├─ postcss.config.js
│  ├─ vite.config.js
│  └─ src/
│     ├─ main.jsx                   # App entry
│     ├─ App.jsx                    # Routes + AuthProvider
│     ├─ index.css                  # Tailwind layers + base styles
│     ├─ context/
│     │  └─ AuthContext.jsx         # Demo auth (login/logout, persistence)
│     ├─ pages/
│     │  ├─ LandingPage.jsx
│     │  ├─ Login.jsx
│     │  ├─ Signup.jsx
│     │  └─ Dashboard.jsx
│     └─ components/
│        ├─ Header.jsx, Hero.jsx, Modules.jsx, Pricing.jsx, Footer.jsx, ...
│        ├─ AuthLayout.jsx, AuthField.jsx, SocialButtons.jsx
│        ├─ ProtectedRoute.jsx
│        └─ dashboard/
│           ├─ Sidebar.jsx, Topbar.jsx, DashboardFooter.jsx
│           ├─ ScoreCards.jsx, ChartsSection.jsx, ActivitySection.jsx
├─ stitch_ecosphere_esg_management_platform/   # Landing page design reference
├─ stitch_ecosphere_dashboard/                 # Dashboard design reference
└─ README.md
```

---

## Design System

The UI follows a **Corporate Modern, Neo-Ecological** style: an off-mint background
(`#F6F9F7`), pure-white cards with hairline borders, a deep forest-gradient sidebar,
and an emerald primary color (`#10B981`). Depth comes from tints and thin borders
rather than heavy shadows. All tokens (colors, typography, spacing) are defined in
`frontend/tailwind.config.js`.

Module accent colors: Environmental (green), Social (blue), Governance (dark/slate),
with amber/red reserved for warnings and compliance risk.

The `stitch_*` folders contain the original HTML/`DESIGN.md` references these pages
were built from.

---

## Roadmap

- Build out the remaining modules (Environmental, Social, Governance, Gamification,
  Reports, Settings) beyond the Executive Overview.
- Replace demo auth with a real backend and secure sessions.
- Add real charting (e.g. Recharts) in place of the static SVG previews.
- Add tests and CI.
