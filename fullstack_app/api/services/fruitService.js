const fruitsData = [
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

const findById = (id) => {
  const fruit = fruits.find(fruit => fruit.id === id)
  return fruit
}

const getFruits = () => fruits

const addFruit = (fruit) => {
  const id = new Date().getTime().toString()
  const newFruit = { ...fruit, id }

  fruits.push(newFruit)
  return newFruit
}

const updateFruit = (id, fruit) => {
  const {name, best} = fruit
  const currentFruit = findById(id)
  const updatedFruit = {...currentFruit, name, best}
  fruits = fruits.map(fruit => fruit.id === id ? updatedFruit : fruit)
  return updatedFruit
}

const deleteFruit = (id) => {
  const fruit = findById(id)

  if(!fruit) {
    throw new Error('Fruit not found')
  }

  fruits = fruits.filter(fruit => fruit.id !== id)
}

const resetFruit = () => {
  fruits = []
}

module.exports = {
  getFruits,
  addFruit,
  findById,
  updateFruit,
  deleteFruit,
  resetFruit
}
