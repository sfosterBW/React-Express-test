import React, { FC, useEffect } from 'react'
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

//TODO: Fix the store mocking for each test
//TODO: Add tests for the reducers

const App: FC = () => {
  const dispatch = useDispatch()

  const modalFruit = useSelector((state: RootState) => state.modal.fruit)
  const message = useSelector((state: RootState) => state.alert.message)

  useEffect(() => {
    dispatch(getFruits())
  }, [dispatch])

  return (
    <div className="App">
      <Nav />
      <main className={styles.main}>
        <Alert message={message} />
        <Router className={styles.main}>
          <Home path="/" title="Add Fruit and stuff" />
          <AddFruit path="/add" title="Add Fruit and stuff" />
          <EditFruit path="/edit" title="Edit your Fruit" />
        </Router>
      </main>
      <Modal fruit={modalFruit} />
    </div>
  )
}

export default App
