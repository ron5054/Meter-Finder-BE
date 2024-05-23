import express from 'express'
import { addCode, getCodes, updateCode } from './code.controller.js'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
const router = express.Router()

router.post('/add', requireAuth, addCode)
router.put('/update', requireAuth, updateCode)
router.get('/', requireAuth, getCodes)

export const codeRoutes = router
