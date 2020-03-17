import axios from 'axios'
import { IFruit } from './interfaces'

axios.defaults.baseURL = '/fruit-api/'

const fetchFruit = async () => {
  const response = await axios.get("list")
  return response.data
}

const createFruit = async (fruit: { name: string, best: boolean }) => {
  try {
    const response = await axios.post('new', { new: fruit })
    return response
  } catch (error) {
    return error
  }
}

const updateFruit = async (fruit: IFruit) => {
  try {
    const response = await axios.put('update', fruit)
    return response
  } catch (error) {
    return error
  }
}

const deleteFruit = async (id: number) => {
  try {
    const deleteData = { params: { id: id } }
    const response = await axios.delete('delete', deleteData)
    return response
  } catch (error) {
    return error
  }
}

export default { fetchFruit, createFruit, updateFruit, deleteFruit }
