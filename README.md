<![CDATA[# 🌍 EcoSphere OS

**The Operating System for Sustainable Enterprises**

> An Enterprise Sustainability Intelligence Platform for tracking, managing, and optimizing ESG (Environmental, Social, Governance) operations — built for the Odoo Hackathon 2026.

🔗 **Live Demo:** [https://xdysfraymp.us-east-1.awsapprunner.com](https://xdysfraymp.us-east-1.awsapprunner.com)

---

## 🚀 Quick Access

| | |
|---|---|
| **URL** | https://xdysfraymp.us-east-1.awsapprunner.com |
| **Email** | `demo@ecosphere.com` |
| **Password** | `EcoSphere@2024` |

---

## ✨ Features

- **Executive Dashboard** — Real-time ESG scores, emissions trends, and recent activity
- **Environmental Module** — Carbon entry tracking by scope (1/2/3), department-level targets
- **Social & CSR** — Program management, volunteer tracking, participation approvals
- **Governance** — Policy lifecycle, audit scheduling, compliance monitoring
- **Gamification** — Team challenges, leaderboard, sustainability sprints
- **Reports & Analytics** — Custom report builder with CSV/PDF export
- **Settings** — Organization management, ESG config toggles, audit trail
- **Authentication** — JWT with refresh token rotation, bcrypt passwords, rate limiting

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                   AWS App Runner                     │
│            (Auto-scaling, HTTPS, CDN)               │
├─────────────────────────────────────────────────────┤
│  Docker Container (Node 20 Alpine)                  │
│  ┌───────────────┐  ┌────────────────────────────┐  │
│  │ React SPA     │  │ Express REST API            │  │
│  │ (Vite build)  │  │ /api/auth, /api/esg,       │  │
│  │               │  │ /api/reports, /api/settings │  │
│  └───────────────┘  └────────────┬───────────────┘  │
└──────────────────────────────────┼──────────────────┘
                                   │
                    ┌──────────────▼──────────────┐
                    │     AWS RDS PostgreSQL       │
                    │     (Prisma ORM + pg)        │
                    │     ecosphere-db.rds...      │
                    └─────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 6, Tailwind CSS 3, Recharts |
| Backend | Node.js, Express 4, ES Modules |
| ORM | Prisma 7 with `@prisma/adapter-pg` |
| Database | PostgreSQL 16.4 (AWS RDS) |
| Auth | JWT (access + refresh tokens), bcryptjs |
| Deployment | Docker, AWS ECR, AWS App Runner |
| Infrastructure | RDS, App Runner, ECR, IAM |

---

## 📂 Project Structure

```
EcoSphere_OS/
├── frontend/                  # React + Vite SPA
│   ├── src/
│   │   ├── pages/             # Dashboard, Environmental, Social, etc.
│   │   ├── components/        # Reusable UI + dashboard widgets
│   │   ├── context/           # AuthContext (JWT integration)
│   │   ├── hooks/             # useLocalStorageState, useSimulatedLoading
│   │   └── utils/             # api.js (centralized client), csv.js
│   └── .env                   # VITE_API_URL
│
├── backend/                   # Express REST API
│   ├── prisma/
│   │   ├── schema.prisma      # 15 models (users, carbon, policies, etc.)
│   │   ├── migrations/        # SQL migrations
│   │   └── seed.js            # Demo data seeder
│   ├── src/
│   │   ├── config/            # env.js, database.js (Prisma + pg pool)
│   │   ├── routes/            # auth, esg, reports, settings
│   │   ├── data/              # Data access layer (Prisma queries)
│   │   ├── middleware/        # JWT auth, rate limiting
│   │   └── utils/             # JWT signing, validation
│   └── .env                   # DATABASE_URL, JWT_SECRET
│
├── infra/                     # AWS deployment configs
│   ├── apprunner.json         # App Runner service definition
│   ├── cloudformation.yaml    # Full infra template
│   └── deploy.ps1             # Deployment scripts
│
├── Dockerfile                 # Multi-stage build (frontend + backend)
└── README.md
```

---

## 🖥️ Local Development

**Prerequisites:** Node.js 20+, Docker (optional for full builds)

### Backend

```bash
cd backend
npm install
cp .env.example .env          # Set DATABASE_URL, JWT_SECRET
npx prisma migrate dev        # Run migrations
node prisma/seed.js           # Seed demo data
npm run dev                   # http://localhost:4000
```

### Frontend

```bash
cd frontend
npm install
npm run dev                   # http://localhost:5173
```

---

## 🗄️ Database

PostgreSQL 16.4 on AWS RDS with 15 tables:

| Module | Tables |
|--------|--------|
| Auth | `users`, `refresh_tokens` |
| Environmental | `departments`, `carbon_entries` |
| Social | `csr_programs`, `csr_participations` |
| Governance | `policies`, `audits` |
| Gamification | `challenges`, `leaderboard` |
| Platform | `organizations`, `app_config`, `reports`, `audit_logs` |

---

## 🌐 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/health` | — | Service health check |
| POST | `/api/auth/register` | — | Create account |
| POST | `/api/auth/login` | — | Authenticate → tokens |
| POST | `/api/auth/refresh` | — | Rotate refresh token |
| POST | `/api/auth/logout` | — | Revoke refresh token |
| GET | `/api/auth/me` | Bearer | Current user |
| GET | `/api/esg/overview` | Bearer | Executive dashboard data |
| GET | `/api/esg/environmental` | Bearer | Carbon entries + summary |
| GET | `/api/esg/social` | Bearer | CSR programs + participation |
| GET | `/api/esg/governance` | Bearer | Policies + audits |
| GET | `/api/esg/gamification` | Bearer | Challenges + leaderboard |
| GET | `/api/reports` | Bearer | Report types + history |
| POST | `/api/reports/generate` | Bearer | Generate a report |
| GET | `/api/settings` | Bearer | Org + config |
| POST | `/api/settings/organizations` | Bearer | Add organization |
| PUT | `/api/settings/config` | Bearer | Update toggles |

---

## ☁️ Deployment

**Live Infrastructure:**

| Service | Resource |
|---------|----------|
| Compute | AWS App Runner (`ecosphere-app`) |
| Database | AWS RDS PostgreSQL 16.4 (`ecosphere-db`) |
| Container Registry | AWS ECR (`ecosphere-app`) |
| Region | `us-east-1` |

**Redeploy:**

```bash
# Build & push
docker build -t ecosphere-app:latest --build-arg VITE_API_URL="" .
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 961308088417.dkr.ecr.us-east-1.amazonaws.com
docker tag ecosphere-app:latest 961308088417.dkr.ecr.us-east-1.amazonaws.com/ecosphere-app:latest
docker push 961308088417.dkr.ecr.us-east-1.amazonaws.com/ecosphere-app:latest

# Trigger deployment
aws apprunner start-deployment --service-arn "arn:aws:apprunner:us-east-1:961308088417:service/ecosphere-app/e0cb1677bfb34809bba8a6ac4a944dc4" --region us-east-1
```

---

## 👥 Team

Built for the **Odoo Hackathon 2026** — ESG Management Platform challenge.

---

## 📄 License

MIT
]]>