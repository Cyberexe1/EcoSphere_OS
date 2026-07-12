# EcoSphere — ESG Management Platform

EcoSphere is a full-stack web application for managing an organization's **ESG**
(Environmental, Social, Governance) program. It brings emissions tracking, CSR and
employee engagement, compliance and governance, gamification, and reporting together
in a single, clean dashboard — built around the idea of "Data Transparency for a
Greener Future."

This repository contains a **frontend** (React + Vite), a **backend** (Node.js +
Express REST API), and the original design references used to build the UI.

---

## Features

- **Marketing landing page** — sticky floating header, hero, modules grid, feature
  highlight, how-it-works, testimonials, pricing, and a multi-column footer.
- **Authentication** — login and sign-up pages with a split brand layout, inline
  validation, password visibility toggle, and a password-strength meter.
- **Protected dashboard** — Executive Overview plus Environmental, Social,
  Governance, Gamification, Reports, and Settings modules, all sharing one app shell.
- **REST API** — Express backend with JWT auth and sample ESG data endpoints.
- **Responsive** — adapts across mobile, tablet, and desktop (collapsible sidebar,
  reflowing grids).

---

## Tech Stack

**Frontend**
- React 18 + Vite 6, React Router 7
- Tailwind CSS 3 with a custom "Eco" design token theme
- Inter font + Material Symbols icons

**Backend**
- Node.js + Express 4 (ES modules)
- JWT (`jsonwebtoken`) auth, `bcryptjs` password hashing
- `cors` + `dotenv`; nodemon for development

---

## Getting Started

Prerequisites: **Node.js 18+** and npm. The frontend and backend run as two separate
processes.

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env      # then edit values (Windows: copy .env.example .env)
npm run dev               # starts the API at http://localhost:4000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev               # starts the app at http://localhost:5173
```

Open the frontend URL in your browser. Keep both processes running during development.

### Scripts

Frontend (`frontend/`):

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the Vite development server        |
| `npm run build`   | Build the production bundle into `dist/` |
| `npm run preview` | Preview the production build locally     |

Backend (`backend/`):

| Command         | Description                                |
| --------------- | ------------------------------------------ |
| `npm run dev`   | Start the API with nodemon (auto-reload)   |
| `npm start`     | Start the API with node                    |

---

## Demo Login

Both the frontend demo auth and the backend seed use the same account:

- **Email:** `demo@ecosphere.com`
- **Password:** `EcoSphere@2024`

On the login page click **Autofill** to populate these fields, then log in to reach
the dashboard. The `/dashboard` and other module routes are protected — visiting them
while logged out redirects to `/login`.

> Note: the frontend currently authenticates against a local demo context and stores
> state in `localStorage`. The backend provides a real JWT login flow you can wire the
> frontend to. Replace the seeded in-memory user and the dev `JWT_SECRET` with a real
> database and a strong secret before any production use.

---

## Backend API

Base URL: `http://localhost:4000`

| Method | Endpoint                     | Auth   | Description                                        |
| ------ | ---------------------------- | ------ | -------------------------------------------------- |
| GET    | `/api/health`                | Public | Service health check                               |
| POST   | `/api/auth/register`         | Public | Create account → `{ user, accessToken, refreshToken }` |
| POST   | `/api/auth/login`            | Public | Log in → `{ user, accessToken, refreshToken }`     |
| POST   | `/api/auth/refresh`          | Public | Rotate refresh token → new `accessToken`           |
| POST   | `/api/auth/logout`           | Public | Revoke a refresh token                             |
| GET    | `/api/auth/me`               | Bearer | Current authenticated user                         |
| POST   | `/api/auth/change-password`  | Bearer | Change password (revokes all sessions)             |
| GET    | `/api/esg/overview`          | Bearer | Executive overview scores + activity               |
| GET    | `/api/esg/environmental`     | Bearer | Emissions summary + entries                        |
| GET    | `/api/esg/social`            | Bearer | CSR KPIs + participation                           |
| GET    | `/api/esg/governance`        | Bearer | Policies + governance KPIs                         |
| GET    | `/api/esg/gamification`      | Bearer | Challenges + leaderboard                           |

**Auth model (no database — in-memory):**
- **Access token** — short-lived JWT (15m), sent as `Authorization: Bearer <accessToken>`.
- **Refresh token** — long-lived (7d), opaque, stored server-side so it can be
  **revoked** on logout / password change. Rotated on every `/refresh` (old token is
  invalidated).
- Passwords are **bcrypt-hashed**; `/register` and `/login` are **rate-limited**;
  registration input is validated (email format + password strength).

```bash
# Log in → capture accessToken + refreshToken
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"demo@ecosphere.com\",\"password\":\"EcoSphere@2024\"}"

# Call a protected route
curl http://localhost:4000/api/esg/overview -H "Authorization: Bearer <accessToken>"

# Refresh when the access token expires
curl -X POST http://localhost:4000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d "{\"refreshToken\":\"<refreshToken>\"}"
```

### Environment variables (`backend/.env`)

| Variable                  | Default                  | Description                             |
| ------------------------- | ------------------------ | --------------------------------------- |
| `PORT`                    | `4000`                   | API port                                |
| `CLIENT_ORIGIN`           | `http://localhost:5173`  | Allowed CORS origin(s), comma-sep       |
| `JWT_SECRET`              | (insecure dev default)   | Secret for signing access tokens        |
| `ACCESS_TOKEN_EXPIRES_IN` | `15m`                    | Access-token lifetime                   |
| `REFRESH_TOKEN_TTL_DAYS`  | `7`                      | Refresh-token lifetime (days)           |
| `BCRYPT_ROUNDS`           | `10`                     | bcrypt cost factor                      |
| `DEMO_EMAIL`              | `demo@ecosphere.com`     | Seeded demo user email                  |
| `DEMO_PASSWORD`           | `EcoSphere@2024`         | Seeded demo user password               |

---

## Frontend Routes

| Path             | Page                | Access    |
| ---------------- | ------------------- | --------- |
| `/`              | Landing page        | Public    |
| `/login`         | Login               | Public    |
| `/signup`        | Sign up             | Public    |
| `/dashboard`     | Executive Overview  | Protected |
| `/environmental` | Environmental       | Protected |
| `/social`        | Social & CSR        | Protected |
| `/governance`    | Governance          | Protected |
| `/gamification`  | Gamification        | Protected |
| `/reports`       | Reports & Analytics | Protected |
| `/settings`      | Settings            | Protected |

---

## Project Structure

```
Ecosphere/
├─ frontend/                        # React + Vite application
│  ├─ index.html
│  ├─ tailwind.config.js            # Custom "Eco" color + typography tokens
│  └─ src/
│     ├─ App.jsx                    # Routes + AuthProvider
│     ├─ context/AuthContext.jsx    # Demo auth (login/logout, persistence)
│     ├─ pages/                     # Landing, Login, Signup + dashboard modules
│     └─ components/
│        ├─ Header, Hero, Modules, Pricing, Footer, AuthLayout, ...
│        ├─ ProtectedRoute.jsx
│        └─ dashboard/              # Sidebar, Topbar, layout + section widgets
│
├─ backend/                         # Node.js + Express REST API
│  ├─ .env.example
│  └─ src/
│     ├─ server.js                  # App entry, CORS, routes, error handling
│     ├─ config/env.js              # Env loading + defaults
│     ├─ middleware/
│     │  ├─ auth.js                 # Access-token verify (requireAuth, requireRole)
│     │  └─ rateLimit.js            # In-memory rate limiter
│     ├─ utils/
│     │  ├─ jwt.js                  # Sign/verify access tokens
│     │  └─ validate.js             # Email + password validation
│     ├─ routes/
│     │  ├─ auth.js                 # register, login, refresh, logout, me, change-password
│     │  └─ esg.js                  # /api/esg/* (protected)
│     └─ data/
│        ├─ users.js                # In-memory user store (bcrypt-hashed)
│        ├─ refreshTokens.js        # In-memory refresh-token store (revocable)
│        └─ esg.js                  # Mock ESG data
│
├─ stitch_ecosphere_*/              # Original HTML / DESIGN.md design references
└─ README.md
```

---

## Design System

The UI follows a **Corporate Modern, Neo-Ecological** style: an off-mint background
(`#F6F9F7`), pure-white cards with hairline borders, a deep forest-gradient sidebar,
and an emerald primary color (`#10B981`). Depth comes from tints and thin borders
rather than heavy shadows. All tokens (colors, typography, spacing) are defined in
`frontend/tailwind.config.js`.

Module accent colors: Environmental (green), Social (blue), Governance (purple),
Gamification (orange), Reports (teal), with amber/red reserved for warnings and
compliance risk.

The `stitch_*` folders contain the original HTML/`DESIGN.md` references these pages
were built from.

---

## Roadmap

- Connect the frontend to the backend API (replace demo auth with real JWT calls and
  fetch live ESG data).
- Persist data in a real database (Postgres/Mongo) instead of the in-memory store.
- Add real charting (e.g. Recharts) in place of the static SVG previews.
- Add tests and CI.
