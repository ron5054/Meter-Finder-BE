import express from 'express'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'

import { createServer } from 'http'

const app = express()
const server = createServer(app)
app.use(express.json())
app.use(cookieParser())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve('public')))
} else {
  const corsOptions = {
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
    credentials: true,
  }
  app.use(cors(corsOptions))
}

import { authRoutes } from './api/auth/auth.routes.js'
import { meterRoutes } from './api/meter/meter.routes.js'
import { codeRoutes } from './api/code/code.routes.js'
import { userRoutes } from './api/user/user.routes.js'
import { shiftRoutes } from './api/shift/shift.routes.js'
app.use('/auth', authRoutes)
app.use('/meter', meterRoutes)
app.use('/code', codeRoutes)
app.use('/user', userRoutes)
app.use('/shift', shiftRoutes)

const port = 3030
server.listen(port, () => console.log(`Server is running on port ${port}`))

app.get('/**', (req, res) => {
  res.sendFile(path.resolve('public/index.html'))
})
