import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { getOverview, getEnvironmental, getSocial, getGovernance, getGamification } from '../data/esg.js'

const router = Router()

// All ESG data routes require authentication.
router.use(requireAuth)

router.get('/overview', async (req, res, next) => {
  try {
    const data = await getOverview()
    res.json(data)
  } catch (err) { next(err) }
})

router.get('/environmental', async (req, res, next) => {
  try {
    const data = await getEnvironmental()
    res.json(data)
  } catch (err) { next(err) }
})

router.get('/social', async (req, res, next) => {
  try {
    const data = await getSocial()
    res.json(data)
  } catch (err) { next(err) }
})

router.get('/governance', async (req, res, next) => {
  try {
    const data = await getGovernance()
    res.json(data)
  } catch (err) { next(err) }
})

router.get('/gamification', async (req, res, next) => {
  try {
    const data = await getGamification()
    res.json(data)
  } catch (err) { next(err) }
})

export default router
