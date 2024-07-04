import express from 'express'
import {
  addCode,
  getCodes,
  updateCode,
  getCodesByAddress,
} from './code.controller.js'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
const router = express.Router()

router.post('/add', requireAuth, addCode)
router.put('/update', requireAuth, updateCode)
router.get('/:address', requireAuth, getCodesByAddress)
router.get('/', requireAuth, getCodes)

export const codeRoutes = router
