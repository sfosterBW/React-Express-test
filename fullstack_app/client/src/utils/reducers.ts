import { Action, Reducer } from "redux"
import { TOGGLE_ALERT } from './actions'

export interface InitialState {
  value: boolean
}

export const initialState: InitialState = {
  value: false
}

export interface DispatchAction extends Action {
  payload: Partial<InitialState>
}

export const rootReducer: Reducer<InitialState, DispatchAction> = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ALERT: {
      return { ...state, value: action.payload.value || false }
    }
    default:
      return { ...state }
  }
}
