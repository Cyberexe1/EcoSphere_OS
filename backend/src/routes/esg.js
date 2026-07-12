import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { overview, environmental, social, governance, gamification } from '../data/esg.js'

const router = Router()

// All ESG data routes require authentication.
router.use(requireAuth)

router.get('/overview', (req, res) => res.json(overview))
router.get('/environmental', (req, res) => res.json(environmental))
router.get('/social', (req, res) => res.json(social))
router.get('/governance', (req, res) => res.json(governance))
router.get('/gamification', (req, res) => res.json(gamification))

export default router
