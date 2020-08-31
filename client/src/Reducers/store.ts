import { applyMiddleware, combineReducers, CombinedState, createStore, Store } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import alertReducer, { Actions as AlertActions } from './alertReducer'
import fruitReducer, { Actions as FruitActions } from './fruitReducer'
import modalReducer, { Actions as ModalActions } from './modalReducer'

export const rootReducer = combineReducers({
  alert: alertReducer,
  fruit: fruitReducer,
  modal: modalReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type RootActions = AlertActions | FruitActions | ModalActions

export const initialState: RootState | undefined = undefined

export const configureStore = (preloadedState: RootState | undefined): Store<CombinedState<RootState>, RootActions> => {
  const middlewares = [thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)
  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)
  const store = createStore(rootReducer, preloadedState, composedEnhancers)
  return store
}

export const store = configureStore(initialState)

export default configureStore
