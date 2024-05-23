import { codeService } from './code.service.js'

export async function addCode(req, res) {
  try {
    const newCode = req.body
    const code = await codeService.addCode(newCode)
    if (code) return res.json({ success: true })
    else throw new Error('Failed to add code')
  } catch (err) {
    res.status(400).send({ err: 'Failed to add code' })
  }
}

export async function getCodes(req, res) {
  const location = {
    latitude: parseFloat(req.query.latitude),
    longitude: parseFloat(req.query.longitude),
  }

  try {
    const codes = await codeService.getCodes(location)
    if (codes) return res.json({ codes })
    else res.status(404).send({ err: 'Did not find codes' })
  } catch (err) {
    res.status(400).send({ err: 'Failed to get codes' })
  }
}

export async function updateCode(req, res) {
  const updatedCode = req.body

  try {
    const success = await codeService.updateCode(updatedCode)
    console.log(success)
    if (success) return res.json({ success: true })
    else throw new Error('Failed to update code')
  } catch (err) {
    res.status(400).send({ err: 'Failed to update code' })
  }
}
