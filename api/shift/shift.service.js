export const shiftService = { addShift, getShifts, removeShift }
import { dbService } from '../../db/db.service.js'

async function addShift(newShift, userId) {
  const { date, read, unread } = newShift
  const year = new Date(date).getFullYear()
  const month = new Date(date).getMonth() + 1

  const collection = await dbService.getCollection('shift')

  const query = {
    userId,
    year,
    month,
  }

  const monthExists = await collection.findOne(query)

  if (!monthExists) {
    return await collection.insertOne({
      userId,
      year,
      month,
      shifts: [newShift],
    })
  } else {
    return await collection.updateOne(query, {
      $push: { shifts: newShift },
    })
  }
}

async function getShifts(userId) {
  const collection = await dbService.getCollection('shift')

  const shifts = await collection.find({ userId }).toArray()
  return shifts
}

async function removeShift(userId, shiftDate) {
  const collection = await dbService.getCollection('shift')
  const date = new Date(shiftDate)

  const result = await collection.updateOne(
    { userId: userId },
    { $pull: { shifts: { date: date.toISOString().split('T')[0] } } }
  )

  return result
}
