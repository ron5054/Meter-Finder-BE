import { dbService } from '../../db/db.service.js'

async function addMeter(newMeter) {
  try {
    const collection = await dbService.getCollection('meter')
    const meter = await collection.findOne({ num: newMeter.num })

    if (meter) throw new Error('Meter already exists')
    else return await collection.insertOne(newMeter)
  } catch (err) {
    throw err
  }
}

async function getMeter(num) {
  try {
    const collection = await dbService.getCollection('meter')

    const meter = await collection.findOne({
      num: { $regex: num, $options: 'i' },
    })
    return meter
  } catch (err) {
    throw err
  }
}

async function getMetersAround(latitude, longitude, radius) {
  try {
    const collection = await dbService.getCollection('meter')
    const meters = await collection
      .aggregate([
        {
          $geoNear: {
            near: {
              type: 'Point',
              coordinates: [latitude, longitude],
            },
            distanceField: 'distance',
            maxDistance: radius,
            spherical: true,
          },
        },
      ])
      .toArray()

    return meters
  } catch (err) {
    throw err
  }
}

export const meterService = { addMeter, getMeter, getMetersAround }
