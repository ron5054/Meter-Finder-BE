import express from 'express'
import { addShift, getShifts, removeShift } from './shift.controller.js'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
const router = express.Router()

router.get('/', requireAuth, getShifts)
router.post('/add', requireAuth, addShift)
router.delete('/remove/:shiftDate', requireAuth, removeShift)

export const shiftRoutes = router
