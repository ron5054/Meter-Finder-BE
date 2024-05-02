import express from 'express'
import cors from 'cors'
import path from 'path'
import { createServer } from 'http'
import { dbService } from './db/db.service.js'

const app = express()
const server = createServer(app)
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve('public')))
} else {
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
}

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

app.post('/addCode', async (req, res) => {
  const newCode = req.body

  const { address } = newCode
  try {
    const collection = await dbService.getCollection('code')
    const code = await collection.findOne({ address })

    if (code) throw new Error('Code already exists')
    else await collection.insertOne(newCode)
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

app.get('/codes', async (req, res) => {
  const latitude = parseFloat(req.query.latitude)
  const longitude = parseFloat(req.query.longitude)

  if (!latitude || !longitude) {
    return res.status(400).json({
      success: false,
      message: 'Latitude and longitude must be provided',
    })
  }

  try {
    const collection = await dbService.getCollection('code')

    const codes = await collection
      .find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [latitude, longitude],
            },
            $maxDistance: 30,
          },
        },
      })
      .toArray()

    res.json({ codes })
  } catch (err) {
    console.error('Error fetching codes:', err)
    res.status(500).json({ success: false, message: 'Error fetching codes' })
  }
})

const port = 3030
server.listen(port, () => console.log(`Server is running on port ${port}`))

app.get('/**', (req, res) => {
  res.sendFile(path.resolve('public/index.html'))
})
