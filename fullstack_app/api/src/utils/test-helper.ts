import Fruit from '../models/fruit'

const initialFruits = [
  {
    name: 'apple',
    best: false,
    description: "They keep doctors away"
  },
  {
    name: 'orange',
    best: true
  }
]

const fruitsInDb = async () => {
  const fruits = await Fruit.find({})
  return fruits
}

const nonExistingId = async () => {
  const fruit = new Fruit({
    name: 'willdelete',
    best: false
  })

  await fruit.save()
  await fruit.remove()

  return fruit.id
}

export default { initialFruits, fruitsInDb, nonExistingId }
