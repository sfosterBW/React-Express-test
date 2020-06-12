import React, { FC, useEffect, useCallback } from 'react'
import { Router } from "@reach/router"
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../Reducers/store'
import { getFruits } from '../../Reducers/fruitReducer'
import Alert from '../Alert/Alert'
import Modal from '../Modal/Modal'
import Nav from '../Nav/Nav'

import AddFruit from '../../Pages/AddFruit'
import EditFruit from '../../Pages/EditFruit'
import Home from '../../Pages/Home'
import styles from './App.module.css'

//TODO: Add descriptions to Fruit, test first

const App: FC = () => {
  const selectFruits = (state: RootState) => state.fruit
  const fruits = useSelector(selectFruits)
  const selectModalFruit = (state: RootState) => state.modal.fruit
  const modalFruit = useSelector(selectModalFruit)
  const selectMessage = (state: RootState) => state.alert.message
  const message = useSelector(selectMessage)
  const dispatch = useDispatch()
  //Used to ensure the same values are used on re-render
  const effectDispatch = useCallback(dispatch, [])

  useEffect(() => {
    effectDispatch(getFruits())
  }, [effectDispatch])

  return (
    <div className="App">
      <Nav />
      <main className={styles.main}>
        <Alert message={message} />
        <Router className={styles.main}>
          <Home path="/" title="Add Fruit and stuff" />
          <AddFruit path="/add" title="Add Fruit and stuff" />
          <EditFruit fruits={fruits} path="/edit" title="True table" />
        </Router>
      </main>
      <Modal fruit={modalFruit} />
    </div>
  )
}

export default App
