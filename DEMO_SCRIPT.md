# 🎬 EcoSphere OS — Demo Video Script

**Total Duration:** ~4–5 minutes  
**URL:** https://xdysfraymp.us-east-1.awsapprunner.com  
**Login:** `demo@ecosphere.com` / `EcoSphere@2024`

---

## Scene 1: Landing Page (30s)

**Screen:** Landing page (unauthenticated)  
**What to show:** Scroll slowly through the entire page

**Narration:**
> "EcoSphere OS — the operating system for sustainable enterprises. This is an Enterprise Sustainability Intelligence Platform that helps organizations track, manage, and optimize their ESG operations in real-time."

**Actions:**
1. Open the live URL — show the hero section with tagline
2. Scroll past "Trusted By" logos
3. Pause on the Feature Highlight section — hover over module cards
4. Scroll through "How It Works" steps
5. Show Pricing tiers briefly
6. End at the CTA section

**Why it matters:**  
Shows the platform is production-ready with a professional marketing presence, not just a dashboard.

---

## Scene 2: Authentication (20s)

**Screen:** Login page  
**What to show:** Real JWT authentication flow

**Narration:**
> "Authentication uses industry-standard JWT with refresh token rotation and bcrypt password hashing. Let's log in as the Chief Sustainability Officer."

**Actions:**
1. Click "Get Started" or "Login" from the landing page
2. Type in `demo@ecosphere.com` and `EcoSphere@2024`
3. Click Login — show the loading state
4. Smooth redirect to Dashboard

**Why it matters:**  
Demonstrates real backend authentication — not mock data. Tokens are stored securely, auto-refresh happens silently.

---

## Scene 3: Executive Dashboard (45s)

**Screen:** Dashboard  
**What to show:** ESG health scores, charts, activity feed

**Narration:**
> "The executive dashboard provides a real-time pulse of the organization's sustainability health. ESG scores are computed live from actual operational data — environmental emissions, social participation, and governance compliance all feed into this unified view."

**Actions:**
1. Point out the ESG score cards at the top (Overall, Environmental, Social, Governance)
2. Hover over the emissions trend chart — show the tooltip data
3. Click the date range dropdown — change to "Last Quarter"
4. Scroll to the Activity section — show recent organizational events
5. Click "Export PDF" button briefly

**Key talking points:**
- Scores are **calculated from real data**, not hardcoded
- Connected to PostgreSQL on AWS RDS
- Every module feeds into the overall ESG health

---

## Scene 4: Environmental Module (50s)

**Screen:** Environmental page  
**What to show:** Carbon tracking, CRUD operations, filtering

**Narration:**
> "The Environmental module tracks carbon emissions across all three GHG Protocol scopes. Organizations can monitor targets vs actuals at the department level, with real-time progress indicators."

**Actions:**
1. Show the summary cards (Total CO2e, Scope 2, Scope 3, Sustainability Index)
2. Point out the data table with emission sources
3. Click scope filter → select "Scope 3" — show filtered results
4. Use the search bar — type a department name
5. Click "Add Entry" → fill in a new emission source:
   - Source: "Fleet Diesel"
   - Department: "Logistics"
   - Scope: 1
   - Target: 500
   - Current: 320
6. Save — show it appear in the table with "On Track" status
7. Click "Export CSV" — download triggers

**Key talking points:**
- Scope 1 (direct), Scope 2 (purchased energy), Scope 3 (supply chain)
- Status automatically computed: On Track vs At Risk
- Progress bars show target vs current visually
- Full CRUD — edit and delete entries too

---

## Scene 5: Social & CSR (40s)

**Screen:** Social page  
**What to show:** CSR programs and volunteer participation

**Narration:**
> "The Social module manages Corporate Social Responsibility programs — tracking volunteer hours, participation rates, and community impact. Employees can register for programs, and managers approve participation."

**Actions:**
1. Show the KPI cards at the top (Active Programs, Total Volunteers, Hours Logged, Impact Score)
2. Scroll through the CSR programs table — show categories (Community, Education, Health)
3. Point out status badges: Active, Completed, Planned
4. Show the participation section — volunteer hours and points
5. If there's an "Approve" action, click it

**Key talking points:**
- Full program lifecycle: Planned → Active → Completed
- Points-based engagement scoring drives gamification
- Hour tracking with target vs actual progress

---

## Scene 6: Governance & Compliance (40s)

**Screen:** Governance page  
**What to show:** Policies and audit management

**Narration:**
> "Governance covers policy management with version control and acknowledgement workflows, plus audit scheduling for internal, external, and regulatory compliance."

**Actions:**
1. Show the KPI cards (Active Policies, Upcoming Audits, Compliance Score, etc.)
2. Show the Policies table — point out version numbers and status
3. Filter by category: Ethics, Eco, Social, Compliance
4. Scroll to the Audits section — show scheduled, in-progress, completed
5. Point out the audit scores

**Key talking points:**
- Policies have acknowledgement progress tracking
- Audits are scored and can track findings
- Everything logs to the system audit trail

---

## Scene 7: Gamification (30s)

**Screen:** Gamification page  
**What to show:** Challenges and leaderboard

**Narration:**
> "Gamification drives employee engagement through sustainability challenges and team competitions. Departments earn points for CSR participation, emission reductions, and compliance achievements."

**Actions:**
1. Show active challenges with progress bars
2. Show the team leaderboard with rankings and points
3. Point out challenge status: Upcoming, Active, Completed
4. Highlight how this connects back to the Social module (points from CSR)

**Key talking points:**
- Sustainability isn't just reporting — it's engagement
- Teams compete in sustainability sprints
- Points integrate across all ESG modules

---

## Scene 8: Reports & Analytics (30s)

**Screen:** Reports page  
**What to show:** Report generation and history

**Narration:**
> "The Reports module enables custom report generation across all ESG categories. Generate Environmental, Social, Governance, or combined ESG Summary reports in PDF or CSV formats."

**Actions:**
1. Show available report types
2. Click "Generate" on an Environmental report
3. Show the report history table with timestamps
4. Point out the format options (PDF/CSV)

**Key talking points:**
- On-demand report generation
- Historical archive of all generated reports
- Supports compliance requirements for periodic ESG disclosure

---

## Scene 9: Settings & Configuration (25s)

**Screen:** Settings page  
**What to show:** Organization management and config toggles

**Narration:**
> "Settings allow multi-organization management with role-based access control, plus system-wide ESG module toggles and a complete audit trail of configuration changes."

**Actions:**
1. Show organization list with roles and permissions
2. Click "Add Organization" — show the form briefly
3. Toggle an ESG configuration setting (e.g., enable/disable a module)
4. Scroll to audit log section — show timestamped system events

**Key talking points:**
- Multi-tenant architecture ready
- Role-based permissions per organization
- Every configuration change is logged for compliance

---

## Scene 10: Technical Wrap-Up (30s)

**Screen:** Can show terminal or architecture slide  

**Narration:**
> "Under the hood, EcoSphere OS runs on a Node.js backend with Express and Prisma ORM, connected to PostgreSQL on AWS RDS. The React frontend is built with Vite and Tailwind CSS. Everything is containerized with Docker, deployed to AWS App Runner with auto-scaling and HTTPS. The entire codebase follows clean architecture — modular routes, centralized data access, and proper separation of concerns."

**Actions:**
1. Optionally show a quick terminal: `curl /api/health` → JSON response
2. Or show the architecture diagram from README
3. End with the live URL on screen

**Key talking points:**
- Real database, real API, real deployment
- Not a prototype — production-grade infrastructure
- Auto-scaling handles any traffic
- Continuous deployment pipeline via ECR → App Runner

---

## Closing (10s)

**Screen:** Landing page or dashboard

**Narration:**
> "EcoSphere OS — from monitoring to action, the operating system for sustainable enterprises. Built for the Odoo Hackathon 2026."

---

## 🎯 Tips for Recording

- **Resolution:** Record at 1920×1080 (Full HD)
- **Browser:** Use Chrome with a clean profile (no extensions visible)
- **Zoom:** Set browser zoom to 90% so more content fits on screen
- **Cursor:** Move slowly and deliberately — viewers need to follow
- **Transitions:** Use the sidebar navigation between modules (smooth, no URL bar typing)
- **Loading:** If data takes a moment to load, that's fine — it shows real API calls
- **Dark mode:** The UI uses dark gradient cards — a light desktop background contrasts nicely

## 🗒️ Talking Points Summary

| Module | Key Value Proposition |
|--------|----------------------|
| Dashboard | Single pane of glass for ESG health — computed from real data |
| Environmental | GHG Protocol-aligned emission tracking with targets |
| Social | CSR program lifecycle with volunteer engagement |
| Governance | Policy versioning + audit scheduling + compliance scoring |
| Gamification | Behavioral change through competition and rewards |
| Reports | Compliance-ready ESG disclosure documents |
| Settings | Enterprise-grade multi-org configuration |
| Tech | Production AWS deployment with PostgreSQL, Docker, auto-scaling |
