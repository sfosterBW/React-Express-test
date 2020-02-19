import { combineReducers, compose, createStore } from "redux"
import {
  alertReducer,
  modalReducer } from './reducers'

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  || compose

export const rootReducer = combineReducers({
  alert: alertReducer,
  modal: modalReducer
})
export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, composeEnhancers())
