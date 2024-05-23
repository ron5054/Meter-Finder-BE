import mongoDB from 'mongodb'
const { MongoClient } = mongoDB
import dotenv from 'dotenv'
dotenv.config()

export const dbService = {
  getCollection,
}

var dbConn = null

async function getCollection(collectionName) {
  try {
    const db = await connect()
    const collection = await db.collection(collectionName)
    return collection
  } catch (err) {
    throw err
  }
}

async function connect() {
  if (dbConn) return dbConn
  try {
    const client = await MongoClient.connect(process.env.DB_URL)

    const db = client.db('Meter-Finder')
    dbConn = db
    return db
  } catch (err) {
    logger.error('Cannot Connect to DB', err)
    throw err
  }
}

await connect()
