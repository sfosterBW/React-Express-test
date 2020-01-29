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
    let fruitReq = req.body.new
    let newFruit = new Fruit(fruitReq.name, fruitReq.best)
    fruitList.push(newFruit)
    res.status(200).send(fruitList)
  } catch (error) {
    next(error)
  }
})

router.put("/update", function(req, res, next) {
  try {
    let index = fruitList.findIndex(i => i._id === req.body._id)
    fruitList[index] = req.body
    res.status(200).send(fruitList)
  } catch (error) {
    next(error)
  }
})

router.delete("/delete", function(req, res, next) {
  try {
    let index = fruitList.findIndex(i => i._id == req.query.id)
    fruitList.splice(index, 1)
    res.status(200).send(fruitList)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
