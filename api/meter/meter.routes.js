import express from 'express'
import { addMeter, getMeter, getMetersAround } from './meter.controller.js'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
const router = express.Router()

router.post('/add', requireAuth, addMeter)
router.get('/around', requireAuth, getMetersAround)
router.get('/:num', requireAuth, getMeter)

export const meterRoutes = router
