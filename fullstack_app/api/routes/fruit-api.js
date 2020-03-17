var express = require("express")
var router = express.Router()

const fruitList = []

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

router.get("/list", function(req, res, next) {
  try {
    res.status(200).send(fruitList);
  } catch (error) {
    next(error)
  }
})

router.post("/new", function(req, res, next) {
  try {
    const fruit = req.body.new
    if(typeof fruit.name !== "string" || typeof fruit.best !== "boolean") {
      res.status(400).send("Incorrect format")
    } else if (fruit.name.length === 0 || fruit.name.length > 50) {
      res.status(400).send("Name too long")
    } else {
      const newFruit = new Fruit(fruit.name, fruit.best)
      fruitList.push(newFruit)
      res.status(201).send(newFruit)
    }
  }
  catch (error) {
    next(error)
  }
})

router.put("/update", function(req, res, next) {
  try {
    const fruit = req.body
    const index = fruitList.findIndex(i => i._id === fruit._id)
    if (typeof fruit.name !== "string" || typeof fruit.best !== "boolean") {
      res.status(400).send("Incorrect format")
    } else if (fruit.name.length === 0 || fruit.name.length > 50) {
      res.status(400).send("Name too long")
    } else if (index === -1) {
      res.status(404).send("Fruit not found")
    } else {
      fruitList[index] = fruit
      res.status(201).send(fruitList[index])
    }
  } catch (error) {
    next(error)
  }
})

router.delete("/delete", function(req, res, next) {
  try {
    const { id } = req.query
    const index = fruitList.findIndex(i => i._id == id)
    if (index === -1) {
      res.status(404).send("Fruit not found")
    } else {
      fruitList.splice(index, 1)
      res.status(200).send(id)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router;
