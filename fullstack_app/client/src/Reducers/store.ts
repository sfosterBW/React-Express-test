import { applyMiddleware, combineReducers, createStore } from "redux"
import thunkMiddleware from "redux-thunk"
import { composeWithDevTools } from 'redux-devtools-extension'
import modalReducer from './modalReducer'
import alertReducer from './alertReducer'
import fruitReducer from './fruitReducer'

export const rootReducer = combineReducers({
  alert: alertReducer,
  fruit: fruitReducer,
  modal: modalReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const configureStore = (preloadedState: undefined) => {
  const middlewares = [thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)
  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)
  const store = createStore(rootReducer, preloadedState, composedEnhancers)
  return store
}

export const store = configureStore(undefined)

export default configureStore
