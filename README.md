<p align="center">
  <img src="https://img.shields.io/badge/🌍_EcoSphere_OS-22c55e?style=for-the-badge" alt="EcoSphere OS" />
</p>

<h1 align="center">EcoSphere OS</h1>

<p align="center">
  <em>The Operating System for Sustainable Enterprises</em>
</p>

<p align="center">
  <a href="https://xdysfraymp.us-east-1.awsapprunner.com"><img src="https://img.shields.io/badge/🔗_Live_Demo-Visit_Now-22c55e?style=for-the-badge" alt="Live Demo" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/node.js-20-339933?style=flat-square&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/react-18-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/postgresql-16-4169E1?style=flat-square&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/prisma-7-2D3748?style=flat-square&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/tailwindcss-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/docker-container-2496ED?style=flat-square&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/AWS-deployed-FF9900?style=flat-square&logo=amazonaws&logoColor=white" />
</p>

---

## About

**EcoSphere OS** is an Enterprise Sustainability Intelligence Platform (ESIP) that enables organizations to track, manage, and optimize their Environmental, Social, and Governance (ESG) operations in real-time.

Unlike traditional ESG tools that focus on periodic reporting, EcoSphere OS treats sustainability as a **continuous operating system** — observing organizational activity, measuring impact, and driving improvement across every department.

Built for the **Odoo Hackathon 2026** — ESG Management Platform challenge.

---

## 🚀 Live Demo

| | |
|:--|:--|
| **URL** | [https://xdysfraymp.us-east-1.awsapprunner.com](https://xdysfraymp.us-east-1.awsapprunner.com) |
| **Email** | `demo@ecosphere.com` |
| **Password** | `EcoSphere@2024` |
| **Role** | Chief Sustainability Officer |

---

## ✨ Platform Modules

### 📊 Executive Dashboard
Real-time ESG health scores with environmental, social, and governance breakdowns. Emissions trend visualization, recent activity feed, and departmental performance at a glance.

### 🌱 Environmental Management
- Carbon entry tracking across **Scope 1, 2, and 3** emissions
- Department-level emission targets and progress
- Status indicators: On Track, At Risk, Exceeded
- Period-based tracking (quarterly)

### 🤝 Social & CSR
- CSR program lifecycle management (Planned → Active → Completed)
- Volunteer hour tracking and participation approval workflows
- Category-based organization (Community, Education, Health, Environment)
- Points-based engagement scoring

### ⚖️ Governance & Compliance
- Policy management with version control and acknowledgement tracking
- Audit scheduling (Internal, External, Regulatory)
- Compliance monitoring with score-based assessments
- Full audit trail logging

### 🏆 Gamification Engine
- Team sustainability challenges with progress tracking
- Points-based leaderboard across departments
- Sprint-based competitions driving engagement

### 📈 Reports & Analytics
- Custom report generation (Environmental, Social, Governance, ESG Summary)
- CSV and PDF export capabilities
- Historical report archive

### ⚙️ Organization Settings
- Multi-organization support with role-based permissions
- ESG module configuration toggles
- Complete audit log of system changes

### 🔐 Security
- JWT authentication with access + refresh token rotation
- bcrypt password hashing
- Rate limiting on sensitive endpoints
- Secure session management

---

## 🏗️ Architecture

```mermaid
flowchart TB
    subgraph Client
        A[Browser]
    end

    subgraph AWS["AWS Cloud (us-east-1)"]
        subgraph AppRunner["App Runner (Auto-scaling, HTTPS)"]
            subgraph Container["Docker Container"]
                B[React SPA]
                C[Express API]
            end
        end
        D[(RDS PostgreSQL 16.4)]
    end

    A -->|HTTPS| AppRunner
    C -->|Prisma ORM| D

    style Client fill:#f0fdf4,stroke:#22c55e
    style AWS fill:#fff7ed,stroke:#f97316
    style AppRunner fill:#eff6ff,stroke:#3b82f6
    style Container fill:#faf5ff,stroke:#a855f7
    style D fill:#e0f2fe,stroke:#0284c7
```

### How It Works

1. **Single Container** — Frontend and backend packaged together in a Docker image
2. **Static Serving** — Vite builds React into static files, Express serves them
3. **API Layer** — All `/api/*` routes handled by Express with JWT middleware
4. **Data Layer** — Prisma 7 ORM with the `@prisma/adapter-pg` driver adapter connects to RDS
5. **Auto-scaling** — App Runner handles traffic scaling, SSL termination, and health checks

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18, Vite 6 | Component UI with fast HMR |
| **Styling** | Tailwind CSS 3 | Utility-first responsive design |
| **Charts** | Recharts | ESG data visualization |
| **Backend** | Express 4, Node.js 20 | REST API with ES Modules |
| **ORM** | Prisma 7 + `@prisma/adapter-pg` | Type-safe database queries |
| **Database** | PostgreSQL 16.4 | Relational data with ACID compliance |
| **Auth** | JWT + bcryptjs | Stateless authentication |
| **Container** | Docker (Alpine) | Reproducible builds |
| **Hosting** | AWS App Runner | Serverless container deployment |
| **Registry** | AWS ECR | Private container images |
| **Database Host** | AWS RDS | Managed PostgreSQL |

---

## 📂 Project Structure

```
EcoSphere_OS/
├── frontend/                    # React + Vite SPA
│   ├── src/
│   │   ├── pages/               # Route pages (Dashboard, Environmental, Social, etc.)
│   │   ├── components/
│   │   │   ├── dashboard/       # Dashboard-specific widgets
│   │   │   └── charts/          # Recharts visualizations
│   │   ├── context/             # AuthContext (JWT state management)
│   │   ├── hooks/               # Custom React hooks
│   │   └── utils/
│   │       ├── api.js           # Centralized HTTP client + token refresh
│   │       └── csv.js           # CSV export utility
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/                     # Express REST API
│   ├── prisma/
│   │   ├── schema.prisma        # 15 database models
│   │   ├── migrations/          # PostgreSQL migrations
│   │   └── seed.js              # Demo data seeder
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js      # Prisma client (PrismaPg adapter)
│   │   │   └── env.js           # Environment configuration
│   │   ├── routes/
│   │   │   ├── auth.js          # Register, login, refresh, logout
│   │   │   ├── esg.js           # ESG overview, env, social, gov, gamification
│   │   │   ├── reports.js       # Report generation and history
│   │   │   └── settings.js      # Organization and config management
│   │   ├── data/                # Data access layer (Prisma queries)
│   │   ├── middleware/          # JWT auth guard, rate limiter
│   │   └── utils/               # JWT helpers, validation
│   ├── prisma.config.ts         # Prisma migration config
│   └── package.json
│
├── infra/                       # Infrastructure as Code
│   ├── apprunner.json           # App Runner service definition
│   ├── apprunner-update.json    # Service update with env vars
│   ├── trust-policy.json        # IAM trust policy for ECR access
│   ├── rds-policy.json          # IAM RDS + networking policy
│   └── deploy.ps1               # Deployment automation
│
├── Dockerfile                   # Multi-stage production build
├── .dockerignore
├── LICENSE
├── CONTRIBUTING.md
└── README.md
```

---

## 🖥️ Local Development

### Prerequisites

- Node.js 20+
- PostgreSQL 16+ (local or remote)
- npm 9+

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Cyberexe1/EcoSphere_OS.git
cd EcoSphere_OS

# --- Backend ---
cd backend
npm install
cp .env.example .env            # Configure DATABASE_URL and JWT_SECRET
npx prisma migrate dev          # Apply database migrations
node prisma/seed.js             # Seed demo data
npm run dev                     # API at http://localhost:4000

# --- Frontend (new terminal) ---
cd frontend
npm install
npm run dev                     # UI at http://localhost:5173
```

### Environment Variables

**Backend** (`backend/.env`):

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `JWT_SECRET` | Secret for signing tokens | (random 64-char string) |
| `JWT_REFRESH_SECRET` | Secret for refresh tokens | (random 64-char string) |
| `PORT` | Server port | `4000` |
| `CLIENT_ORIGIN` | Allowed CORS origins | `http://localhost:5173` |

**Frontend** (`frontend/.env`):

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:4000` (empty in production) |

---

## 🗄️ Database

PostgreSQL 16.4 with 15 tables managed by Prisma ORM:

| Module | Tables | Description |
|--------|--------|-------------|
| **Auth** | `users`, `refresh_tokens` | User accounts and session tokens |
| **Environmental** | `departments`, `carbon_entries` | Emission tracking by scope and department |
| **Social** | `csr_programs`, `csr_participations` | CSR programs and volunteer participation |
| **Governance** | `policies`, `audits` | Policy lifecycle and audit scheduling |
| **Gamification** | `challenges`, `leaderboard` | Team challenges and rankings |
| **Platform** | `organizations`, `app_config`, `reports`, `audit_logs` | System-wide configuration |

### Migrations

```bash
cd backend
npx prisma migrate dev          # Create + apply migration
npx prisma migrate deploy       # Apply in production
npx prisma studio               # Visual DB browser
```

---

## 🌐 API Reference

Base URL: `https://xdysfraymp.us-east-1.awsapprunner.com/api`

### Authentication

| Method | Endpoint | Body | Response |
|--------|----------|------|----------|
| `POST` | `/auth/register` | `{ name, email, password }` | `{ user, accessToken, refreshToken }` |
| `POST` | `/auth/login` | `{ email, password }` | `{ user, accessToken, refreshToken }` |
| `POST` | `/auth/refresh` | `{ refreshToken }` | `{ accessToken, refreshToken }` |
| `POST` | `/auth/logout` | `{ refreshToken }` | `{ message }` |
| `GET` | `/auth/me` | — | `{ user }` |

### ESG Data (🔒 Bearer Token Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/esg/overview` | Overall ESG scores + recent activity |
| `GET` | `/esg/environmental` | Carbon entries, targets, department breakdown |
| `GET` | `/esg/social` | CSR programs, participation stats |
| `GET` | `/esg/governance` | Policies, audits, compliance scores |
| `GET` | `/esg/gamification` | Active challenges + leaderboard |

### Reports & Settings (🔒 Bearer Token Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/reports` | Available report types + history |
| `POST` | `/reports/generate` | Generate new report |
| `GET` | `/settings` | Organization list + app config |
| `POST` | `/settings/organizations` | Create organization |
| `PUT` | `/settings/config` | Update config toggles |

### Health Check

```bash
curl https://xdysfraymp.us-east-1.awsapprunner.com/api/health
# → {"status":"ok","service":"ecosphere-backend","time":"..."}
```

---

## ☁️ Deployment

### Infrastructure

| Component | Service | Details |
|-----------|---------|---------|
| **Compute** | AWS App Runner | Auto-scaling, HTTPS, health checks |
| **Database** | AWS RDS | PostgreSQL 16.4, `db.t3.micro` |
| **Registry** | AWS ECR | Private Docker image repository |
| **Region** | us-east-1 | N. Virginia |

### Deploy New Version

```bash
# Build
docker build -t ecosphere-app:latest --build-arg VITE_API_URL="" .

# Authenticate with ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin \
  961308088417.dkr.ecr.us-east-1.amazonaws.com

# Push
docker tag ecosphere-app:latest \
  961308088417.dkr.ecr.us-east-1.amazonaws.com/ecosphere-app:latest
docker push \
  961308088417.dkr.ecr.us-east-1.amazonaws.com/ecosphere-app:latest

# Deploy
aws apprunner start-deployment \
  --service-arn "arn:aws:apprunner:us-east-1:961308088417:service/ecosphere-app/e0cb1677bfb34809bba8a6ac4a944dc4" \
  --region us-east-1
```

---

## 🧪 Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Monolithic container** | Single deploy unit simplifies hackathon ops; frontend and API in one image |
| **Prisma 7 with pg adapter** | Latest ORM with native PostgreSQL driver (no Prisma engine binary) |
| **JWT over sessions** | Stateless auth scales with App Runner's auto-scaling |
| **App Runner over ECS** | Zero-config container hosting, no cluster management |
| **Tailwind CSS** | Rapid UI iteration without CSS file management |
| **Vite** | Sub-second HMR for frontend development speed |

---

## 👥 Team

<table align="center">
<tr>
<td align="center" width="25%">
<h3>Utsav Singh</h3>
<p>
<a href="https://github.com/Utsav-Singh-35" target="_blank"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/utsavsingh35/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>
<a href="https://utsavsingh35.vercel.app/" target="_blank"><img src="https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Portfolio"/></a>
</p>
</td>
<td align="center" width="25%">
<h3>Om Singh</h3>
<p>
<a href="https://github.com/Jayom5797" target="_blank"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/5797omsingh/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>
<a href="https://om07.vercel.app/" target="_blank"><img src="https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Portfolio"/></a>
</p>
</td>
<td align="center" width="25%">
<h3>Vikas Tiwari</h3>
<p>
<a href="https://github.com/Cyberexe1" target="_blank"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/1045-vikas-tiwari/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>
<a href="https://vikas-tiwari-portfolio.vercel.app/" target="_blank"><img src="https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Portfolio"/></a>
</p>
</td>
</tr>
</table>


---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.

---

<p align="center">
  <strong>EcoSphere OS</strong> — Built with 💚 for a sustainable future
</p>
