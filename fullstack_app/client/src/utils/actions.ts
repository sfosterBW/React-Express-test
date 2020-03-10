import { IFruit } from './interfaces'
 
//Action const
export const TOGGLE_ALERT = "TOGGLE_ALERT"

//Action shape
interface ToggleAlert {
  type: typeof TOGGLE_ALERT,
  payload: boolean
}

//Action type
export type AlertActionTypes = ToggleAlert

//Action
export function toggleAlert(alertValue: boolean): AlertActionTypes {
  return {
    type: TOGGLE_ALERT,
    payload: alertValue
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
  payload: IFruit
}

//Action type
export type ModalActionTypes = ToggleModal | OpenModal

//Action
export function toggleModal(modalValue: boolean): ModalActionTypes {
  return {
    type: TOGGLE_MODAL,
    payload: modalValue,
  }
}

export function openModal(fruit: IFruit): ModalActionTypes {
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
  payload: IFruit[]
}

interface CreateFruit {
  type: typeof CREATE_FRUIT,
  payload: IFruit
}

interface RemoveFruit {
  type: typeof REMOVE_FRUIT,
  payload: number
}

interface UpdateFruit {
  type: typeof UPDATE_FRUIT,
  payload: IFruit
}

//Action types
export type FruitActionTypes = GetFruits | CreateFruit | RemoveFruit | UpdateFruit

//Actions
export const getFruits = (fruits: IFruit[]): FruitActionTypes => {
  return {
    type: GET_FRUITS,
    payload: fruits
  }
}

export const createFruit = (fruit: IFruit): FruitActionTypes => {
  return {
    type: CREATE_FRUIT,
    payload: fruit,
  }
}

export const removeFruit = (id: number): FruitActionTypes => {
  return {
    type: REMOVE_FRUIT,
    payload: id,
  }
}

export const updateFruit = (fruit: IFruit): FruitActionTypes => {
  return {
    type: UPDATE_FRUIT,
    payload: fruit,
  }
}
