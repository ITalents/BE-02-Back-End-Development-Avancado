import fastify from 'fastify'
import { db } from './database/db'

const app = fastify()

app.get('/products', async () => {
  const products = await db.collection('products').find({}).toArray()
  return products
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server running!')
  })
