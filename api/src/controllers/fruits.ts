import express from 'express'
import Fruit from '../models/fruit'
import { toFruit, toNewFruit } from '../utils'
const router = express.Router()

router.get('/', async (_request, response) => {
  const fruits = await Fruit.find({})
  return response.status(200).send(fruits)
})

router.post('/', async (request, response) => {
  const newFruit = toNewFruit(request.body)

  if (newFruit.name.length < 2 || newFruit.name.length > 50) {
    return response.status(400).send("Name too long")
  }

  const fruit = new Fruit(newFruit)
  const savedFruit = await fruit.save()
  return response.status(201).send(savedFruit)
})

router.put('/:id', async (request, response) => {
  const { id } = request.params
  const fruit = toFruit(request.body)

  if (fruit.name.length < 2 || fruit.name.length > 50) {
    return response.status(400).send("Name too long")
  }

  const updatedFruit = await Fruit.findByIdAndUpdate(id, fruit, { new: true })
  return response.status(201).send(updatedFruit)
})

router.delete('/:id', async (request, response) => {
  const { id } = request.params

  await Fruit.findByIdAndRemove(id)
  return response.status(200).send(id)
})

export default router
