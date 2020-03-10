import React, { FC, useEffect } from 'react'
import { Router } from "@reach/router"
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../utils/store'
import fruitService from '../../utils/api'
import { getFruits } from '../../utils/actions'
import Modal from '../Modal/Modal'
import Nav from '../Nav/Nav'

import AddFruit from '../../Pages/AddFruit'
import EditFruit from '../../Pages/EditFruit'
import Home from '../../Pages/Home'
import styles from './App.module.css'

const App: FC = () => {

  const selectFruits = (state: RootState) => state.fruit.data
  const fruits = useSelector(selectFruits)
  const selectModalFruit = (state: RootState) => state.modal.fruit
  const modalFruit = useSelector(selectModalFruit)
  const dispatch = useDispatch()

  useEffect(() => {
    function initFruit() {
      fruitService.fetchFruit()
        .then(res => dispatch(getFruits(res)))
    }
    initFruit()
  }, [])

  return (
    <div className="App">
      <Nav />
      <main className={styles.main}>
        <Router className={styles.main}>
          <Home path="/" title="Add Fruit and stuff" />
          <AddFruit path="/add" title="Add Fruit and stuff" />
          <EditFruit fruits={fruits} path="/edit" title="True table"/>
        </Router>
      </main>
      <Modal fruit={modalFruit} title="This is a modal" />
    </div>
  )
}

export default App
