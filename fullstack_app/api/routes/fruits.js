const express = require('express')
const router = express.Router()
const fruitService = require('../services/fruitService')

router.get('/list', (request, response, next) => {
  try {
    response.status(200).send(fruitService.getFruits())
  } catch (error) {
    next(error)
  }
})

router.post('/new', async (request, response, next) => {
  const { name, best } = request.body.new

  try {
    if (typeof name !== "string" || typeof best !== "boolean") {
      response.status(400).send("Incorrect format")
    }

    if (name.length < 1 || name.length > 50) {
      response.status(400).send("Name too long")
    }

    const newFruit = await fruitService.addFruit({ name, best })
    response.status(201).send(newFruit)
  } catch (error) {
    next(error)
  }
})

router.put('/update', async (request, response, next) => {
  const { id } = request.body
  const fruit = request.body

  try {
    if (typeof fruit.name !== "string" || typeof fruit.best !== "boolean") {
      response.status(400).send("Incorrect format")
    }

    if (fruit.name.length < 1 || fruit.name.length > 50) {
      response.status(400).send("Name too long")
    }

    if (!fruit) {
      response.status(404).send("Fruit not found")
    }

    const updatedFruit = await fruitService.updateFruit(id, fruit)
    response.status(201).send(updatedFruit)
  } catch (error) {
    next(error)
  }
})

router.delete('/delete', async (request, response, next) => {
  const { id } = request.query
  
  try {
    await fruitService.deleteFruit(id)
    response.status(200).send(String(id))
  } catch (error) {
    next(error)
  }
})

module.exports = router
