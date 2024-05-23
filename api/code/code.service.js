import { dbService } from '../../db/db.service.js'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

async function addCode(newCode) {
  try {
    const collection = await dbService.getCollection('code')
    const code = await collection.findOne({ address: newCode.address })

    if (code) throw new Error('Code already exists')
    else return await collection.insertOne(newCode)
  } catch (err) {
    res.json({ success: false, message: err.message })
  }
}

async function getCodes(location) {
  const { latitude, longitude } = location

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
            $maxDistance: 100,
          },
        },
      })
      .toArray()

    return codes
  } catch (err) {
    console.error('Error fetching codes:', err)
  }
}

async function updateCode(updatedData) {
  const { codeId, updatedNum } = updatedData
  if (!codeId || !updatedNum) return null

  try {
    const collection = await dbService.getCollection('code')

    const result = await collection.updateOne(
      { _id: new ObjectId(codeId) },
      { $set: { num: updatedNum } }
    )

    if (result.modifiedCount === 1) return result
  } catch (err) {
    console.error(err)
  }
}

export const codeService = { addCode, getCodes, updateCode }
