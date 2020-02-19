import { applyMiddleware, combineReducers, createStore } from "redux"
import thunkMiddleware from "redux-thunk"
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  alertReducer,
  fruitReducer,
  modalReducer } from './reducers'

export const rootReducer = combineReducers({
  alert: alertReducer,
  fruit: fruitReducer,
  modal: modalReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default function configureStore(preloadedState: undefined) {
  const middlewares = [thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)
  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)
  const store = createStore(rootReducer, preloadedState, composedEnhancers)
  return store
}

export const store = configureStore(undefined)
