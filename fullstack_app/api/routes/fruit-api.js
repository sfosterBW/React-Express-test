var express = require("express");
var router = express.Router();

const fruitList = []

class Fruit {
  constructor(name, best) {
    this._id = Fruit.incrementId()
    this.name = name
    this.best = best
  }

  static incrementId() {
    if (!this.latestId) this.latestId = 1
    else this.latestId++
    return this.latestId
  }
}

router.get("/list", function(req, res, next) {
  res.send(fruitList);
});

router.post("/new", function(req, res) {
  let newFruit = new Fruit(req.body.new, false)
  fruitList.push(newFruit)
  res.end("Yes")
});

router.put("/update", function(req, res, next) {
  let index = fruitList.findIndex(i => i._id === req.body.id)
  fruitList[index].best = req.body.value
  res.end("Yes")
})


module.exports = router;
