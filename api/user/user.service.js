import { dbService } from '../../db/db.service.js'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

export const userService = {
  add,
  getByUsername,
}

async function getByUsername(username) {
  try {
    const collection = await dbService.getCollection('user')
    const user = await collection.findOne({ username })
    return user
  } catch (err) {
    throw err
  }
}

async function add(user) {
  try {
    const userToAdd = {
      username: user.username,
      password: user.password,
    }

    const collection = await dbService.getCollection('user')
    await collection.insertOne(userToAdd)
    return userToAdd
  } catch (err) {
    throw err
  }
}
