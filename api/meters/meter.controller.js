import { meterService } from './meter.service.js'

export async function addMeter(req, res) {
  const newMeter = req.body
  try {
    await meterService.addMeter(newMeter)
    res.json({ success: true })
  } catch (err) {
    res.status(400).send({ err: 'Failed to add meter' })
  }
}

export async function getMeter(req, res) {
  const num = req.params.num
  try {
    const meter = await meterService.getMeter(num)
    if (!meter) return res.status(404).json({ error: 'Meter not found' })
    res.json(meter)
  } catch (err) {
    throw err
  }
}
