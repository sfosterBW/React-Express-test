import axios from 'axios'
import { Fruit, NewFruit } from './interfaces'

axios.defaults.baseURL = '/fruit-api'

const fetchFruit = async (): Promise<Fruit[]> => {
  const response = await axios.get('/')
  return response.data
}

const createFruit = async (fruit: NewFruit): Promise<Fruit> => {
    const response = await axios.post('/', fruit)
    return response.data
}

const updateFruit = async (fruit: Fruit): Promise<Fruit> => {
    const response = await axios.put(`/${fruit.id}`, fruit)
    return response.data
}

const deleteFruit = async (id: string): Promise<Fruit['id']> => {
  const response = await axios.delete(`/${id}`)
  return response.data
}

export default { fetchFruit, createFruit, updateFruit, deleteFruit }
