import express from 'express'
import { getUser, updateUser } from './user.controller.js'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'

const router = express.Router()

router.get('', requireAuth, getUser)
router.put('/', requireAuth, updateUser)

export const userRoutes = router
