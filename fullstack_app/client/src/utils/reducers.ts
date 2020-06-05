import { AlertState, FruitState, ModalState } from './interfaces'
import {
  TOGGLE_ALERT,
  AlertActionTypes,
  TOGGLE_MODAL,
  OPEN_MODAL,
  ModalActionTypes,
  GET_FRUITS,
  CREATE_FRUIT,
  REMOVE_FRUIT,
  UPDATE_FRUIT,
  FruitActionTypes,
} from './actions'

export const initialAlertState: AlertState = {
  toggle: false
}

export function alertReducer(
  state = initialAlertState,
  action: AlertActionTypes): AlertState {
  switch (action.type) {
    case TOGGLE_ALERT: {
      return { ...state, toggle: action.payload || false }
    }
    default:
      return { ...state }
  }
}

export const initialModalState: ModalState = {
  toggle: false,

}

export function modalReducer(
  state = initialModalState,
  action: ModalActionTypes): ModalState {
  switch (action.type) {
    case TOGGLE_MODAL: {
      return { ...state, toggle: action.payload || false }
    }
    case OPEN_MODAL: {
      return { toggle: true, fruit: action.payload }
    }
    default:
      return { ...state }
  }
}

export const initialFruitState: FruitState = {
  data: []
}

export function fruitReducer(
  state = initialFruitState,
  action: FruitActionTypes
): FruitState {
  switch (action.type) {
    case GET_FRUITS: {
      return { ...state, data: action.payload }
    }
    case CREATE_FRUIT: {
      return { ...state, data: state.data.concat(action.payload) }
    }
    case REMOVE_FRUIT: {
      const newFruits = state.data.filter(i => i.id !== action.payload)
      return { ...state, data: newFruits }
    }
    case UPDATE_FRUIT: {
      const updateFruit = state.data.map((fruit) => {
        if (fruit.id === action.payload.id) {
          fruit.best = action.payload.best
          fruit.name = action.payload.name
          return fruit
        } else {
          return fruit
        }
      })
      return { ...state, data: updateFruit }
    }
    default:
      return { ...state }
  }
}
