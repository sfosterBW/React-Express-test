import axios from 'axios'
import { Fruit, FruitResponse } from './Components/interfaces'

axios.defaults.baseURL = '/fruit-api/'

function handleError(error: any) {
  console.log(error)
  return error.repsonse
}

export async function getFruitList() {
  try {
    const response = await axios.get("list")
    const fruitList: Fruit[] = response.data
    const result = {status: response.status, data: fruitList}
    return result
  } catch (error) {
    const emptyList: Fruit[] = []
    const result = {status: 500, data: emptyList, original: handleError(error)}
    return result
  }
}

export async function createFruit(fruit: {name: string, best: boolean}) {
    try {
      const response: FruitResponse = await axios.post('new',{ new: fruit })
      return response.status
    }
    catch (error) {
      handleError(error)
      return 500
    }
}

export async function updateFruit(fruit: Fruit) {
  try {
    const response: FruitResponse = await axios.put('update', fruit)
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
    const response: FruitResponse = await axios.delete('delete',  deleteData)
    return response.status
  }
  catch (error) {
    handleError(error)
    return 500
  }
}
