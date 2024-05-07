import { dbService } from '../../db/db.service.js'

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

export const codeService = { addCode, getCodes }
