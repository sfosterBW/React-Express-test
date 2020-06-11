import express from 'express'
import Fruit from '../models/fruit'
const router = express.Router()

router.post('/reset', async (_request, response) => {
  await Fruit.deleteMany({})
  
  response.status(204).send('fruit has been reset')
})

export default router
