import express from 'express'
import fruitService from '../services/fruitService'
import { toFruit, toNewFruit } from '../utils'
const router = express.Router()

router.get('/', (_request, response) => {
  response.status(200).send(fruitService.getFruits())
})

router.post('/', (request, response) => {
  const newFruit = toNewFruit(request.body)

  if (newFruit.name.length < 1 || newFruit.name.length > 50) {
    response.status(400).send("Name too long")
  }

  const fruit = fruitService.addFruit(newFruit)
  response.status(201).send(fruit)
})

router.put('/:id', (request, response) => {
  const { id } = request.params
  const fruit = toFruit(request.body)

  if (fruit.name.length < 1 || fruit.name.length > 50) {
    response.status(400).send("Name too long")
  }

  const updatedFruit = fruitService.updateFruit(id, fruit)
  response.status(201).send(updatedFruit)
})

router.delete('/:id', (request, response) => {
  const { id } = request.params

  fruitService.deleteFruit(id)
  response.status(200).send(id)
})

export default router
