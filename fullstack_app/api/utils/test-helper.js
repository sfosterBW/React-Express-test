const fruitService = require('../services/fruitService')

const fruits = fruitService.fruits

let initialFruits = [
  {
    id: "1",
    name: "Apple",
    best: false
  },
  {
    id: "2",
    name: "Orange",
    best: true
  },
  {
    id: "3",
    name: "banana",
    best: false
  }
]

module.exports = { initialFruits, fruits }
