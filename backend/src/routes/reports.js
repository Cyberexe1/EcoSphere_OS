import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import prisma from '../config/database.js'

const router = Router()

router.use(requireAuth)

const REPORT_TYPES = [
  { id: 'environmental', title: 'Environmental', icon: 'forest', description: 'Carbon footprint, energy efficiency metrics, and water usage analysis across all facilities.' },
  { id: 'social', title: 'Social', icon: 'diversity_3', description: 'Workforce diversity, employee turnover, and community impact programs and engagement.' },
  { id: 'governance', title: 'Governance', icon: 'account_balance', description: 'Board structure, executive compensation, and compliance tracking with global regulations.' },
  { id: 'summary', title: 'ESG Summary', icon: 'analytics', description: 'A holistic overview combining all pillars into a single stakeholder-ready executive summary.' },
]

// GET /api/reports — available report types + history
router.get('/', async (req, res, next) => {
  try {
    const history = await prisma.report.findMany({
      orderBy: { generatedAt: 'desc' },
      take: 20,
    })
    res.json({ reportTypes: REPORT_TYPES, history })
  } catch (err) { next(err) }
})

// GET /api/reports/facility-data — facility-level ESG metrics from carbon entries
router.get('/facility-data', async (req, res, next) => {
  try {
    const entries = await prisma.carbonEntry.findMany({
      include: { department: { select: { name: true } } },
    })

    // Group by department as proxy for facility
    const grouped = {}
    for (const e of entries) {
      const dept = e.department.name
      if (!grouped[dept]) grouped[dept] = { facility: dept, co2: 0, energy: 0, status: 'Optimized' }
      grouped[dept].co2 += e.current
      if (e.status === 'At Risk') grouped[dept].status = 'Attention'
    }

    res.json({ source: req.query.source || 'Global Operations', facilities: Object.values(grouped) })
  } catch (err) { next(err) }
})

// GET /api/reports/monthly-summary — time series
router.get('/monthly-summary', async (req, res, next) => {
  try {
    const entries = await prisma.carbonEntry.findMany()
    const total = entries.reduce((sum, e) => sum + e.current, 0)

    // Simulated monthly breakdown (would be real time-series in production)
    const summary = [
      { month: 'Jan', co2: Math.round(total * 0.20), energy: Math.round(total * 3.1), renewablePercent: 34 },
      { month: 'Feb', co2: Math.round(total * 0.19), energy: Math.round(total * 3.0), renewablePercent: 36 },
      { month: 'Mar', co2: Math.round(total * 0.18), energy: Math.round(total * 2.9), renewablePercent: 38 },
      { month: 'Apr', co2: Math.round(total * 0.17), energy: Math.round(total * 2.8), renewablePercent: 41 },
      { month: 'May', co2: Math.round(total * 0.15), energy: Math.round(total * 2.7), renewablePercent: 44 },
      { month: 'Jun', co2: Math.round(total * 0.14), energy: Math.round(total * 2.6), renewablePercent: 47 },
    ]
    res.json({ summary })
  } catch (err) { next(err) }
})

// POST /api/reports/generate — trigger report generation
router.post('/generate', async (req, res, next) => {
  try {
    const { type, format = 'PDF' } = req.body || {}
    if (!type) return res.status(400).json({ error: 'Report type is required.' })

    const valid = REPORT_TYPES.find((r) => r.id === type || r.title === type)
    if (!valid) return res.status(400).json({ error: 'Invalid report type.' })

    const report = await prisma.report.create({
      data: {
        title: `${valid.title} Report - ${new Date().toISOString().slice(0, 10)}`,
        type: valid.title,
        format,
        status: 'Completed',
      },
    })

    res.status(201).json({ message: 'Report generated successfully.', report })
  } catch (err) { next(err) }
})

export default router
