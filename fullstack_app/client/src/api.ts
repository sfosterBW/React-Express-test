import axios from 'axios'
import { Fruit, NewFruit } from './Components/interfaces'

function handleError(error: any) {
  return error.repsonse
}

export async function getFruitList() {
  try {
    const response = await axios.get("/fruit-api/list")
    const fruitList: Fruit[] = response.data
    const result = {status: response.status, data: fruitList}
    return result
  } catch (error) {
    const emptyList: Fruit[] = []
    const result = {status: 500, data: emptyList, original: handleError(error)}
    console.log(result)
    return result
  }
}

export async function createFruit(fruit: NewFruit) {
    try {
      const response = await axios.post("/fruit-api/new", { new: fruit })
      return response.status
    }
    catch (error) {
      handleError(error)
      return 500
    }
}

export async function updateFruit(fruit: Fruit) {
  try {
    const response = await axios.put("/fruit-api/update", fruit)
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
    const response = await axios.delete("/fruit-api/delete", deleteData)
    return response.status
  }
  catch (error) {
    handleError(error)
    return 500
  }
}
