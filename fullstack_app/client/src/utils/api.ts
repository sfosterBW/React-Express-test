import axios from 'axios'
import { IFruit } from './interfaces'

axios.defaults.baseURL = '/fruit-api/'

function handleError(error: any) {
  console.log(error)
  return error.repsonse
}

export async function fetchFruit() {
  try {
    const response = await axios.get("list")
    return response
  }
  catch (error) {
    handleError(error)
    return {status: 500, data: []}
  }
}

export async function createFruit(fruit: { name: string, best: boolean }) {
  try {
    const response = await axios.post('new', { new: fruit })
    return response.status
  }
  catch (error) {
    handleError(error)
    return 500
  }
}

export async function updateFruit(fruit: IFruit) {
  try {
    const response = await axios.put('update', fruit)
    return response.status
  }
  catch (error) {
    handleError(error)
    return 500
  }
}

export async function deleteFruit(id: number) {
  const deleteData = { params: { id: id } }
  try {
    const response = await axios.delete('delete', deleteData)
    return response.status
  }
  catch (error) {
    handleError(error)
    return 500
  }
}
