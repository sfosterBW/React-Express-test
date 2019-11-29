var express = require("express");
var router = express.Router();

var fruitList = ["Apple", "Banana", "Orange"]

router.get("/list", function(req, res, next) {
  res.send(fruitList);
});

router.get("/best-fruit/:fruit", function(req, res, next) {
  res.send(req.params.fruit);
});

router.post("/new", function(req, res) {
  fruitList.push(req.body.new)
  res.end("Yes")
});

module.exports = router;
