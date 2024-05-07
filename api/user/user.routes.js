import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { getUser } from './user.controller.js'

const router = express.Router()

router.get('/:id', getUser)

export const userRoutes = router
