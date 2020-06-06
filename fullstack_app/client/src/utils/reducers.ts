import { AlertState, FruitState, ModalState } from './interfaces'
import {
  TOGGLE_ALERT,
  AlertActions,
  TOGGLE_MODAL,
  OPEN_MODAL,
  ModalActions,
  GET_FRUITS,
  CREATE_FRUIT,
  REMOVE_FRUIT,
  UPDATE_FRUIT,
  FruitActions,
} from './actions'

export const initAlertState: AlertState = { toggle: false }

export const alertReducer = (
  state = initAlertState,
  action: AlertActions
): AlertState => {
  switch (action.type) {
    case TOGGLE_ALERT:
      return { ...state, toggle: action.payload || false }
    default:
      return { ...state }
  }
}

export const initModalState: ModalState = { toggle: false }

export const modalReducer = (
  state = initModalState,
  action: ModalActions
): ModalState => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return { ...state, toggle: action.payload || false }
    case OPEN_MODAL:
      return { toggle: true, fruit: action.payload }
    default:
      return { ...state }
  }
}

export const initFruitState: FruitState = { data: [] }

export const fruitReducer = (
  state = initFruitState,
  action: FruitActions
): FruitState => {
  switch (action.type) {
    case GET_FRUITS:
      return { ...state, data: action.payload }
    case CREATE_FRUIT:
      return { ...state, data: state.data.concat(action.payload) }
    case REMOVE_FRUIT:
      const newFruits = state.data.filter(fruit => fruit.id !== action.payload)
      return { ...state, data: newFruits }
    case UPDATE_FRUIT:
      const updatedFruits = state.data
        .map(fruit => fruit.id === action.payload.id ? action.payload : fruit)
      return { ...state, data: updatedFruits }
    default:
      return { ...state }
  }
}
