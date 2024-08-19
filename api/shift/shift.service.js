export const shiftService = { addShift, getShifts, removeShift, updateMonth }
import { dbService } from '../../db/db.service.js'
import { ObjectId } from 'mongodb'

async function addShift(newShift, userId) {
  const { date } = newShift
  const year = new Date(date).getFullYear()
  const month = new Date(date).getMonth() + 1

  const collection = await dbService.getCollection('shift')
  const query = { userId, year, month }

  const update = {
    $push: {
      shifts: {
        $each: [newShift],
        $sort: { date: 1 },
      },
    },
  }

  return await collection.findOneAndUpdate(query, update, {
    upsert: true,
    returnOriginal: false,
  })
}

async function getShifts(userId) {
  const collection = await dbService.getCollection('shift')
  const shifts = await collection.find({ userId }).sort({ month: 1 }).toArray()
  return shifts
}

async function removeShift(userId, shiftDate) {
  const collection = await dbService.getCollection('shift')
  const date = new Date(shiftDate).toISOString().split('T')[0]

  const result = await collection.updateOne(
    { userId, 'shifts.date': date },
    { $pull: { shifts: { date: date } } }
  )

  return result
}

async function updateMonth(updatedMonth) {
  const collection = await dbService.getCollection('shift')
  const { _id, ...updatedData } = updatedMonth

  return collection.updateOne({ _id: new ObjectId(_id) }, { $set: updatedData })
}
