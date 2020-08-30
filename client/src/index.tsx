import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './Reducers/store'
import './index.css'
import App from './Components/App/App'

const rootElement = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
