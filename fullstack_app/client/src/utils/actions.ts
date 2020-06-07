import { Fruit } from './interfaces'

//Action const
export const TOGGLE_ALERT = "TOGGLE_ALERT"

//Action shape
interface ToggleAlert {
  type: typeof TOGGLE_ALERT,
  payload: {
    message: string
    toggle: boolean
  }
}

//Action type
export type AlertActions = ToggleAlert

//Action
export function toggleAlert(message: string, toggle: boolean): AlertActions {
  return {
    type: TOGGLE_ALERT,
    payload: { message, toggle }
  }
}

//Action const
export const TOGGLE_MODAL = "TOGGLE_MODAL"
export const OPEN_MODAL = "OPEN_MODAL"

//Action shape
interface ToggleModal {
  type: typeof TOGGLE_MODAL,
  payload: boolean
}

interface OpenModal {
  type: typeof OPEN_MODAL,
  payload: Fruit
}

//Action type
export type ModalActions = ToggleModal | OpenModal

//Action
export function toggleModal(modalValue: boolean): ModalActions {
  return {
    type: TOGGLE_MODAL,
    payload: modalValue,
  }
}

export function openModal(fruit: Fruit): ModalActions {
  return {
    type: OPEN_MODAL,
    payload: fruit,
  }
}

//Action const
export const GET_FRUITS = 'GET_FRUITS'
export const CREATE_FRUIT = 'CREATE_FRUIT'
export const REMOVE_FRUIT = 'REMOVE_FRUIT'
export const UPDATE_FRUIT = 'UPDATE_FRUIT'

//Action shape
interface GetFruits {
  type: typeof GET_FRUITS,
  payload: Fruit[]
}

interface CreateFruit {
  type: typeof CREATE_FRUIT,
  payload: Fruit
}

interface RemoveFruit {
  type: typeof REMOVE_FRUIT,
  payload: string
}

interface UpdateFruit {
  type: typeof UPDATE_FRUIT,
  payload: Fruit
}

//Action types
export type FruitActions = GetFruits | CreateFruit | RemoveFruit | UpdateFruit

//Actions
export const getFruits = (fruits: Fruit[]): FruitActions => {
  return {
    type: GET_FRUITS,
    payload: fruits
  }
}

export const createFruit = (fruit: Fruit): FruitActions => {
  return {
    type: CREATE_FRUIT,
    payload: fruit,
  }
}

export const removeFruit = (id: string): FruitActions => {
  return {
    type: REMOVE_FRUIT,
    payload: id,
  }
}

export const updateFruit = (fruit: Fruit): FruitActions => {
  return {
    type: UPDATE_FRUIT,
    payload: fruit,
  }
}
