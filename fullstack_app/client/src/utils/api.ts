import axios from 'axios'
import { IFruit, NewFruit } from './interfaces'

axios.defaults.baseURL = '/fruit-api'

const fetchFruit = async (): Promise<IFruit[]> => {
  const response = await axios.get('/')
  return response.data
}

const createFruit = async (fruit: NewFruit): Promise<IFruit> => {
    const response = await axios.post('/', fruit)
    return response.data
}

const updateFruit = async (fruit: IFruit): Promise<IFruit> => {
    const response = await axios.put(`/${fruit.id}`, fruit)
    return response.data
}

const deleteFruit = async (id: string): Promise<IFruit['id']> => {
  const response = await axios.delete(`/${id}`)
  return response.data
}

export default { fetchFruit, createFruit, updateFruit, deleteFruit }
