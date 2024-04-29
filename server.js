import express from 'express'
import cors from 'cors'
import path from 'path'
import { createServer } from 'http'
import { dbService } from './db/db.service.js'

const app = express()
const server = createServer(app)
app.use(express.json())

const corsOptions = {
  origin: [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://localhost:5173',
  ],
  credentials: true,
}

app.use(cors(corsOptions))

app.get('/**', (req, res) => {
  res.sendFile(path.resolve('public/index.html'))
})

app.post('/add', async (req, res) => {
  const newMeter = req.body
  try {
    const collection = await dbService.getCollection('meter')
    const meter = await collection.findOne({ num: newMeter.num })
    if (meter) throw new Error('Meter already exists')
    else await collection.insertOne(newMeter)
    res.json({ success: true })
  } catch (err) {
    res.json({ success: false, message: err.message })
  }
})

app.get('/meter/:num', async (req, res) => {
  try {
    const collection = await dbService.getCollection('meter')
    const meter = await collection.findOne({ num: req.params.num })
    if (!meter) throw new Error('Meter not found')
    res.json(meter)
  } catch (err) {
    res.json({ success: false, message: err.message })
  }
})

const port = 3030
server.listen(port, () => console.log(`Server is running on port ${port}`))
