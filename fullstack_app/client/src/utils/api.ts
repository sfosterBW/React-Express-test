import axios from 'axios'
import { IFruit } from './interfaces'

axios.defaults.baseURL = '/fruit-api'

const fetchFruit = async () => {
  const response = await axios.get('/')
  return response.data
}

const createFruit = async (fruit: { name: string, best: boolean }) => {
  try {
    const response = await axios.post('/', fruit)
    return response
  } catch (error) {
    return error
  }
}

const updateFruit = async (fruit: IFruit) => {
  try {
    console.log('submit update', fruit)
    const response = await axios.put(`/${fruit.id}`, fruit)
    console.log('response', response)
    return response
  } catch (error) {
    return error
  }
}

const deleteFruit = async (id: string) => {
  try {
    const response = await axios.delete(`/${id}`)
    return response
  } catch (error) {
    return error
  }
}

export default { fetchFruit, createFruit, updateFruit, deleteFruit }
