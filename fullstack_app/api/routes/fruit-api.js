const express = require('express')
const router = express.Router()

let fruitList = []

class Fruit {
  constructor(name, best) {
    this._id = Fruit.incrementId()
    this.name = name
    this.best = best
  }

  static incrementId() {
    if (!this.latestId)
      this.latestId = 1
    else
      this.latestId++
    return this.latestId
  }
}

router.get('/list', (request, response, next) => {
  try {
    response.status(200).send(fruitList)
  } catch (error) {
    next(error)
  }
})

router.post('/new', (request, response, next) => {
  try {
    const { name, best } = request.body.new
    if(typeof name !== "string" || typeof best !== "boolean") {
      response.status(400).send("Incorrect format")
    } else if (name.length === 0 || name.length > 50) {
      response.status(400).send("Name too long")
    } else {
      const newFruit = new Fruit(name, best)
      fruitList = fruitList.concat(newFruit)
      response.status(201).send(newFruit)
    }
  }
  catch (error) {
    next(error)
  }
})

router.put('/update', (request, response, next) => {
  try {
    const { _id, name, best } = request.body
    const index = fruitList.findIndex(i => i._id === _id)
    if (typeof name !== "string" || typeof best !== "boolean") {
      response.status(400).send("Incorrect format")
    } else if (name.length === 0 || name.length > 50) {
      response.status(400).send("Name too long")
    } else if (index === -1) {
      response.status(404).send("Fruit not found")
    } else {
      const updatedFruit = Object.assign({}, { _id, name, best })
      fruitList = fruitList
        .map(fruit => fruit._id === updatedFruit._id ? updatedFruit : fruit)
      response.status(201).send(updatedFruit)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/delete', (request, response, next) => {
  try {
    const { id } = request.query
    const index = fruitList.findIndex(fruit => fruit._id === Number(id))
    if (index === -1) {
      response.status(404).send("Fruit not found")
    } else {
      fruitList = fruitList.filter(fruit => fruit._id !== Number(id))
      response.status(200).send(id)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
