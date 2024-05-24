import express from 'express'
import { getUser } from './user.controller.js'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'

const router = express.Router()

router.get('', requireAuth, getUser)

export const userRoutes = router
