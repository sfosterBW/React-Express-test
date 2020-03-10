import axios from 'axios'
import { IFruit } from './interfaces'
 
axios.defaults.baseURL = '/fruit-api/'

const fetchFruit = async () => {
  const response = await axios.get("list")
  return response.data
}

const createFruit = async (fruit: { name: string, best: boolean }) => {
    const response = await axios.post('new', { new: fruit })
    return response.data
}

const updateFruit = async (fruit: IFruit) => {
    const response = await axios.put('update', fruit)
    return response.data
}

const deleteFruit = async (id: number) => {
  const deleteData = { params: { id: id } }
  const response = await axios.delete('delete', deleteData)
  return response.data
}

export default { fetchFruit, createFruit, updateFruit, deleteFruit }
