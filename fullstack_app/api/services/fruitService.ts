import { Fruit, NewFruit } from '../utils/types'

const fruitsData: Fruit[] = [
  {
    id: "1",
    name: "Apple",
    best: false
  },
  {
    id: "2",
    name: "Orange",
    best: true
  }
]

let fruits = fruitsData

const findById = (id: string): Fruit | undefined => {
  const fruit = fruits.find(fruit => fruit.id === id)
  return fruit
}

const getFruits = (): Fruit[] => fruits

const addFruit = (newFruit: NewFruit): Fruit => {
  const id = `${new Date().getTime().toString()}${Math.floor(Math.random() * 1000)}`
  const fruit: Fruit = { ...newFruit, id }

  fruits.push(fruit)
  return fruit
}

const updateFruit = (id: string, fruit: Fruit): Fruit => {
  const { name, best } = fruit
  const currentFruit = findById(id)

  if(!currentFruit) {
    throw new Error('Fruit not found')
  }

  const updatedFruit: Fruit = {...currentFruit, name, best}
  fruits = fruits.map(fruit => fruit.id === id ? updatedFruit : fruit)
  return updatedFruit
}

const deleteFruit = (id: string): void => {
  const fruit = findById(id)

  if(!fruit) {
    throw new Error('Fruit not found')
  }

  fruits = fruits.filter(fruit => fruit.id !== id)
}

const resetFruit = (): void => {
  fruits = []
}

export default {
  getFruits,
  addFruit,
  findById,
  updateFruit,
  deleteFruit,
  resetFruit,
  fruits
}
