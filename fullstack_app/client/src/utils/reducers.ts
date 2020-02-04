import {AlertState, ModalState} from './interfaces'
import {
  TOGGLE_ALERT,
  AlertActionTypes,
  TOGGLE_MODAL,
  ModalActionTypes } from './actions'

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
  toggle: false
}

export function modalReducer(
  state = initialModalState,
  action: ModalActionTypes): ModalState {
  switch (action.type) {
    case TOGGLE_MODAL: {
      return {...state, toggle: action.payload || false}
    }
    default:
      return { ...state }
  }
}
