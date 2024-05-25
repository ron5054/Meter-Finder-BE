import { shiftService } from './shift.service.js'

export async function addShift(req, res) {
  const userId = req.user.id
  const newShift = req.body
  const success = await shiftService.addShift(newShift, userId)

  if (!success) return res.status(404).json({ error: 'Shift not added' })
  res.json({ success: true })
}

export async function getShifts(req, res) {
  const userId = req.user.id
  try {
    const shifts = await shiftService.getShifts(userId)
    if (!shifts) return res.status(404).json({ error: 'Shifts not found' })
    res.json(shifts)
  } catch (err) {
    throw err
  }
}

export async function removeShift(req, res) {
  const shiftDate = req.params.shiftDate
  const userId = req.user.id

  try {
    const success = await shiftService.removeShift(userId, shiftDate)
    if (!success) return res.status(404).json({ error: 'Shift not removed' })
    res.json({ success: true })
  } catch (err) {
    throw err
  }
}
