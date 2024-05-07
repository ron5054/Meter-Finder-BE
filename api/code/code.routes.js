import express from 'express'
import { addCode, getCodes } from './code.controller.js'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
const router = express.Router()

router.post('/add', requireAuth, addCode)
router.get('/', requireAuth, getCodes)

export const codeRoutes = router
