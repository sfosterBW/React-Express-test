import fruitService from '../services/fruitService'
import { Fruit } from '../utils/types'

const fruits: Fruit[] = fruitService.fruits

const initialFruits: Fruit[] = [
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

export default { initialFruits, fruits }
