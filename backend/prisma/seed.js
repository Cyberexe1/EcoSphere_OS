import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding EcoSphere database...')

  // ─── Users ───────────────────────────────────────────────────────────────
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@ecosphere.com' },
    update: {},
    create: {
      name: 'Sarah Jenkins',
      email: 'demo@ecosphere.com',
      passwordHash: bcrypt.hashSync('EcoSphere@2024', 10),
      role: 'Chief Sustainability Officer',
    },
  })
  console.log('  ✓ Demo user created')

  // ─── Organizations ─────────────────────────────────────────────────────────
  const orgs = await Promise.all([
    prisma.organization.create({
      data: { name: 'EcoSphere North America', icon: 'apartment', users: 42, role: 'Regional Admin', permissions: 'Read/Write', status: 'Active' },
    }),
    prisma.organization.create({
      data: { name: 'EcoSphere Europe Hub', icon: 'factory', users: 118, role: 'Global Viewer', permissions: 'Read Only', status: 'Active' },
    }),
    prisma.organization.create({
      data: { name: 'Supply Chain Beta Org', icon: 'inventory', users: 5, role: 'Standard User', permissions: 'Restricted', status: 'Pending' },
    }),
  ])
  console.log('  ✓ Organizations created')

  // ─── Departments ───────────────────────────────────────────────────────────
  const departments = await Promise.all([
    prisma.department.create({ data: { name: 'Facilities', organizationId: orgs[0].id } }),
    prisma.department.create({ data: { name: 'Operations', organizationId: orgs[0].id } }),
    prisma.department.create({ data: { name: 'Sales & Marketing', organizationId: orgs[0].id } }),
    prisma.department.create({ data: { name: 'Logistics', organizationId: orgs[0].id } }),
    prisma.department.create({ data: { name: 'Engineering', organizationId: orgs[1].id } }),
  ])
  console.log('  ✓ Departments created')

  // ─── Carbon Entries (Environmental) ────────────────────────────────────────
  await Promise.all([
    prisma.carbonEntry.create({ data: { source: 'HVAC Natural Gas', scope: 1, target: 1200, current: 1080, status: 'On Track', departmentId: departments[0].id, createdById: demoUser.id, period: '2024-Q2' } }),
    prisma.carbonEntry.create({ data: { source: 'Grid Electricity', scope: 2, target: 4500, current: 4120, status: 'On Track', departmentId: departments[1].id, createdById: demoUser.id, period: '2024-Q2' } }),
    prisma.carbonEntry.create({ data: { source: 'Business Travel', scope: 3, target: 800, current: 940, status: 'At Risk', departmentId: departments[2].id, createdById: demoUser.id, period: '2024-Q2' } }),
    prisma.carbonEntry.create({ data: { source: 'Downstream Logistics', scope: 3, target: 2200, current: 1850, status: 'On Track', departmentId: departments[3].id, createdById: demoUser.id, period: '2024-Q2' } }),
    prisma.carbonEntry.create({ data: { source: 'Server Infrastructure', scope: 2, target: 600, current: 520, status: 'On Track', departmentId: departments[4].id, createdById: demoUser.id, period: '2024-Q2' } }),
  ])
  console.log('  ✓ Carbon entries created')

  // ─── CSR Programs (Social) ─────────────────────────────────────────────────
  const programs = await Promise.all([
    prisma.cSRProgram.create({ data: { title: 'Beach Cleanup Initiative', category: 'Environment', status: 'Active', targetHours: 500, currentHours: 380 } }),
    prisma.cSRProgram.create({ data: { title: 'STEM Education Mentorship', category: 'Education', status: 'Active', targetHours: 1000, currentHours: 720 } }),
    prisma.cSRProgram.create({ data: { title: 'Tree Plantation Drive', category: 'Environment', status: 'Active', targetHours: 300, currentHours: 145 } }),
    prisma.cSRProgram.create({ data: { title: 'Community Health Screening', category: 'Health', status: 'Planned', targetHours: 200, currentHours: 0 } }),
  ])
  console.log('  ✓ CSR programs created')

  // ─── CSR Participations ────────────────────────────────────────────────────
  await Promise.all([
    prisma.cSRParticipation.create({ data: { userId: demoUser.id, programId: programs[0].id, status: 'Approved', hours: 12, points: 150 } }),
    prisma.cSRParticipation.create({ data: { userId: demoUser.id, programId: programs[1].id, status: 'Registered', hours: 0, points: 0 } }),
  ])
  console.log('  ✓ CSR participations created')

  // ─── Policies (Governance) ─────────────────────────────────────────────────
  await Promise.all([
    prisma.policy.create({ data: { name: 'Anti-Bribery & Corruption', category: 'Ethics', version: 'v2.4', status: 'Active', progress: 92 } }),
    prisma.policy.create({ data: { name: 'Environmental Impact Charter', category: 'Eco', version: 'v1.1', status: 'Active', progress: 78 } }),
    prisma.policy.create({ data: { name: 'Supply Chain Labor Ethics', category: 'Social', version: 'v3.0', status: 'Reviewing', progress: 45 } }),
    prisma.policy.create({ data: { name: 'Data Privacy & Security', category: 'Compliance', version: 'v2.1', status: 'Active', progress: 88 } }),
    prisma.policy.create({ data: { name: 'Whistleblower Protection', category: 'Ethics', version: 'v1.0', status: 'Active', progress: 95 } }),
  ])
  console.log('  ✓ Policies created')

  // ─── Audits ────────────────────────────────────────────────────────────────
  await Promise.all([
    prisma.audit.create({ data: { title: 'ISO 14001 Compliance', type: 'External', status: 'Scheduled', scheduledAt: new Date('2024-08-15') } }),
    prisma.audit.create({ data: { title: 'Internal Governance Review', type: 'Internal', status: 'Completed', scheduledAt: new Date('2024-06-01'), completedAt: new Date('2024-06-10'), score: 87 } }),
    prisma.audit.create({ data: { title: 'Supply Chain Ethics Audit', type: 'Regulatory', status: 'Scheduled', scheduledAt: new Date('2024-09-20') } }),
  ])
  console.log('  ✓ Audits created')

  // ─── Challenges (Gamification) ─────────────────────────────────────────────
  await Promise.all([
    prisma.challenge.create({ data: { title: 'Sustainability Sprint', status: 'Active', percent: 68 } }),
    prisma.challenge.create({ data: { title: 'Zero-Waste Quarter', status: 'Upcoming', percent: 0 } }),
    prisma.challenge.create({ data: { title: 'Aqua Conservation', status: 'Active', percent: 42 } }),
    prisma.challenge.create({ data: { title: 'Carbon Neutral Week', status: 'Completed', percent: 100 } }),
  ])
  console.log('  ✓ Challenges created')

  // ─── Leaderboard ───────────────────────────────────────────────────────────
  await Promise.all([
    prisma.leaderboardEntry.create({ data: { team: 'Engineering Dept.', points: 12450, rank: 1 } }),
    prisma.leaderboardEntry.create({ data: { team: 'Marketing Global', points: 11820, rank: 2 } }),
    prisma.leaderboardEntry.create({ data: { team: 'Finance Operations', points: 9640, rank: 3 } }),
    prisma.leaderboardEntry.create({ data: { team: 'Supply Chain', points: 8920, rank: 4 } }),
    prisma.leaderboardEntry.create({ data: { team: 'HR & People', points: 7650, rank: 5 } }),
  ])
  console.log('  ✓ Leaderboard created')

  // ─── App Config ────────────────────────────────────────────────────────────
  await Promise.all([
    prisma.appConfig.create({ data: { key: 'esg.autoEmission', value: 'true' } }),
    prisma.appConfig.create({ data: { key: 'esg.requireReviewer', value: 'false' } }),
    prisma.appConfig.create({ data: { key: 'esg.anonymize', value: 'true' } }),
    prisma.appConfig.create({ data: { key: 'notifications.complianceAlerts', value: 'true' } }),
    prisma.appConfig.create({ data: { key: 'notifications.weeklySummary', value: 'true' } }),
    prisma.appConfig.create({ data: { key: 'notifications.smsMfa', value: 'false' } }),
  ])
  console.log('  ✓ App config created')

  // ─── Reports ───────────────────────────────────────────────────────────────
  await Promise.all([
    prisma.report.create({ data: { title: 'Q1 2024 Environmental Report', type: 'Environmental', format: 'PDF', status: 'Completed' } }),
    prisma.report.create({ data: { title: 'Annual ESG Summary 2023', type: 'ESG Summary', format: 'PDF', status: 'Completed' } }),
    prisma.report.create({ data: { title: 'Social Impact Q4 2023', type: 'Social', format: 'Excel', status: 'Completed' } }),
  ])
  console.log('  ✓ Reports created')

  console.log('\n✅ Seed complete!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
