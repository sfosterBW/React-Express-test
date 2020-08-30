import React, { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from "redux-mock-store"
import thunk from "redux-thunk"

import { initState as initAlertState } from '../Reducers/alertReducer'
import { initState as initFruitState } from '../Reducers/fruitReducer'
import { initState as initModalState } from '../Reducers/modalReducer'
import { RootState } from '../Reducers/store'

export const rootInitialState = {
  alert: initAlertState,
  fruit: initFruitState,
  modal: initModalState
};

export const renderWithProviders = (
  ui: ReactNode,
  initialState: RootState = rootInitialState
) => {
  const store = configureStore([thunk])(initialState)
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    mockStore: store,
    getActionsTypes: () => store.getActions().map(a => a.type)
  }
}
