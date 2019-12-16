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
    if (!this.latestId)
      this.latestId = 1
    else
      this.latestId++
    return this.latestId
  }
}

router.get("/list", function(req, res) {
  try {
    res.send(fruitList);
  } catch (error) {
    console.log(error, "get")
  }
});

router.post("/new", function(req, res) {
  try {
    let fruitReq = req.body.new
    let newFruit = new Fruit(fruitReq.name, fruitReq.best)
    fruitList.push(newFruit)
    res.end("Yes")
  } catch (error) {
    console.log(error, "post")
  }
});

router.put("/update", function(req, res) {
  try {
    let index = fruitList.findIndex(i => i._id === req.body.id)
    fruitList[index].best = req.body.value
    res.end("Yes")
  } catch (error) {
    console.log(error, "put")
  }
});

router.delete("/delete", function(req, res) {
  try {
    let index = fruitList.findIndex(i => i._id == req.query.id)
    fruitList.splice(index,1)
    res.end("Yes")
  } catch (error) {
    console.log(error, "delete")
  }
});

module.exports = router;
