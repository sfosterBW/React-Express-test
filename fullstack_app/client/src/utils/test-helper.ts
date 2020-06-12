import { Fruit } from './interfaces'

export const emptyList: Fruit[] = []

export const fruit: Fruit = {
  id: "1",
  name:"apple",
  best:false,
  description: "I don't like doctors"
}

export const list: Fruit[] = [
  {
    id: "1",
    name: "apple",
    best: false,
    description: "I don't like doctors"
  },
  {
    id: "2",
    name: "banana",
    best: true
  }
]

export default { emptyList, fruit, list }
