import { MongoClient } from 'mongodb'
import { env } from '../env'

const mongoClient = new MongoClient(env.MONGO_URI)

try {
  await mongoClient.connect()
  console.log('MongoDB conectado!')
} catch (err: any) {
  console.log(err.message)
}

export const db = mongoClient.db('marketing-place')
