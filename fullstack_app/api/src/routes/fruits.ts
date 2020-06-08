import express from 'express'
import fruitService from '../services/fruitService'
import { toFruit, toNewFruit } from '../utils'
const router = express.Router()

router.get('/', async (_request, response) => {
  return response.status(200).send(fruitService.getFruits())
})

router.post('/', async (request, response) => {
  const newFruit = toNewFruit(request.body)

  if (newFruit.name.length < 2 || newFruit.name.length > 50) {
    return response.status(400).send("Name too long")
  }

  const fruit = fruitService.addFruit(newFruit)
  return response.status(201).send(fruit)
})

router.put('/:id', async (request, response) => {
  const { id } = request.params
  const fruit = toFruit(request.body)

  if (fruit.name.length < 2 || fruit.name.length > 50) {
    return response.status(400).send("Name too long")
  }

  const updatedFruit = fruitService.updateFruit(id, fruit)
  return response.status(201).send(updatedFruit)
})

router.delete('/:id', async (request, response) => {
  const { id } = request.params

  fruitService.deleteFruit(String(id))
  return response.status(200).send(String(id))
})

export default router
