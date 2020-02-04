import { compose, createStore } from "redux"
import { DispatchAction, InitialState, rootReducer } from './reducers'

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  || compose

export const store = createStore<InitialState, DispatchAction, null, null>(
  rootReducer,
  composeEnhancers()
)
