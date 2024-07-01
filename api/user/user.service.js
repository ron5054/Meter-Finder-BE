import { dbService } from '../../db/db.service.js'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

export const userService = {
  add,
  getByUsername,
  getById,
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

async function getById(userId) {
  try {
    const collection = await dbService.getCollection('user')
    const user = await collection.findOne({ _id: new ObjectId(userId) })

    delete user.password
    return user
  } catch (err) {
    throw err
  }
}

async function add({ username, password, name }) {
  try {
    const userToAdd = {
      username,
      password,
      name,
    }

    const collection = await dbService.getCollection('user')
    await collection.insertOne(userToAdd)
    return userToAdd
  } catch (err) {
    throw err
  }
}
