import { ThunkAction } from 'redux-thunk'

import { Fruit, NewFruit } from '../utils/interfaces'
import fruitService from '../utils/api'
import { toggleAlert, ToggleAlert } from './alertReducer'

//State types
type State = Fruit[]
export const initState: State = []

//Action consts
const GET_FRUITS = 'GET_FRUITS'
const CREATE_FRUIT = 'CREATE_FRUIT'
const REMOVE_FRUIT = 'REMOVE_FRUIT'
const UPDATE_FRUIT = 'UPDATE_FRUIT'

//Action shapes
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
type Actions = GetFruits | CreateFruit | RemoveFruit | UpdateFruit | ToggleAlert

export const reducer = (state = initState, action: Actions): State => {
  switch (action.type) {
    case GET_FRUITS:
      return action.payload
    case CREATE_FRUIT:
      return state.concat(action.payload)
    case REMOVE_FRUIT:
      return state.filter(fruit => fruit.id !== action.payload)
    case UPDATE_FRUIT:
      return state
        .map(fruit => fruit.id === action.payload.id ? action.payload : fruit)
    default:
      return state
  }
}

//Actions
export const getFruits = (): ThunkAction<void, {}, {}, Actions> => {
  return async dispatch => {
    const fruits = await fruitService.fetchFruit()
    dispatch({
      type: GET_FRUITS,
      payload: fruits
    })
  }
}

export const createFruit = (newFruit: NewFruit): ThunkAction<void, {}, {}, Actions> => {
  return async dispatch=> {
    try {
      const fruit = await fruitService.createFruit(newFruit)
      dispatch({
        type: CREATE_FRUIT,
        payload: fruit,
      })
    }
    catch (error) {
      dispatch(toggleAlert(error.response.data, true))
    }
  }
}

export const removeFruit = (deleteId: string): ThunkAction<void, {}, {}, Actions> => {
  return async dispatch => {
    try {
      const id = await fruitService.deleteFruit(deleteId)
      dispatch({
        type: REMOVE_FRUIT,
        payload: id,
      })
    }
    catch (error) {
      dispatch(toggleAlert(error.response.data, true))
    }
  }
}

export const updateFruit = (updateFruit: Fruit): ThunkAction<void, {}, {}, Actions> => {
  return async dispatch => {
    try {
      const fruit = await fruitService.updateFruit(updateFruit)
      dispatch({
        type: UPDATE_FRUIT,
        payload: fruit,
      })
    }
    catch (error) {
      dispatch(toggleAlert(error.response.data, true))
    }
  }
}

export default reducer
