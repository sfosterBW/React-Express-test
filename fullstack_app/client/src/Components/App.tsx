import React, { FC, useEffect } from 'react'
import { RootState } from '../utils/store'
import { useSelector, useDispatch } from 'react-redux'
import './App.scss'
import Alert from './Alert'
import Form from './Form'
import Modal from './Modal'
import Table from './Table'
import fruitService from '../utils/api'
import { getFruits } from '../utils/actions'

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
      <header className="App-header">
        <h1>Fruit dashboard</h1>
        <Alert />
        <Form />
        <Table fruits={fruits} title="True table" type={true} />
        <Table fruits={fruits} title="False table" type={false}/>
      </header>
      <Modal fruit={modalFruit} title="This is a modal" />
    </div>
  )
}

export default App
