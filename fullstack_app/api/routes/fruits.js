const express = require('express')
const router = express.Router()
const fruitService = require('../services/fruitService')

router.get('/', (request, response) => {
  response.status(200).send(fruitService.getFruits())
})

router.post('/', async (request, response) => {
  const { name, best } = request.body

  if (typeof name !== "string" || typeof best !== "boolean") {
    response.status(400).send("Incorrect format")
  }

  if (name.length < 1 || name.length > 50) {
    response.status(400).send("Name too long")
  }

  const newFruit = await fruitService.addFruit({ name, best })
  response.status(201).send(newFruit)
})

router.put('/:id', async (request, response) => {
  const { id } = request.params
  const fruit = request.body

  if (typeof fruit.name !== "string" || typeof fruit.best !== "boolean") {
    response.status(400).send("Incorrect format")
  }

  if (fruit.name.length < 1 || fruit.name.length > 50) {
    response.status(400).send("Name too long")
  }

  const updatedFruit = await fruitService.updateFruit(id, fruit)
  response.status(201).send(updatedFruit)
})

router.delete('/:id', async (request, response) => {
  const { id } = request.params

  await fruitService.deleteFruit(id)
  response.status(200).send(id)
})

module.exports = router
