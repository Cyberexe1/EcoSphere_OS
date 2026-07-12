import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { reportTypes, facilityData, monthlySummary, reportHistory } from '../data/reports.js'

const router = Router()

router.use(requireAuth)

// GET /api/reports — available report types
router.get('/', (req, res) => {
  res.json({ reportTypes, history: reportHistory })
})

// GET /api/reports/facility-data — facility-level ESG metrics
router.get('/facility-data', (req, res) => {
  const { source } = req.query
  // In production, filter by data source / region
  res.json({ source: source || 'Global Operations', facilities: facilityData })
})

// GET /api/reports/monthly-summary — time series aggregation
router.get('/monthly-summary', (req, res) => {
  res.json({ summary: monthlySummary })
})

// POST /api/reports/generate — trigger report generation (mock)
router.post('/generate', (req, res) => {
  const { type, format = 'PDF' } = req.body || {}
  if (!type) return res.status(400).json({ error: 'Report type is required.' })

  const valid = reportTypes.find((r) => r.id === type || r.title === type)
  if (!valid) return res.status(400).json({ error: 'Invalid report type.' })

  // Simulate async generation
  const report = {
    id: Date.now(),
    title: `${valid.title} Report - ${new Date().toISOString().slice(0, 10)}`,
    type: valid.title,
    generatedAt: new Date().toISOString(),
    status: 'Completed',
    format,
  }

  res.status(201).json({ message: 'Report generated successfully.', report })
})

export default router
