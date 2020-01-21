import React, { useState, useEffect } from 'react'
import * as api from '../api'
import { IFruit } from '../interfaces'
import './App.scss'
import Alert from './Alert'
import Form from './Form'
import Modal from './Modal'
import Row from './Row'
import Table from './Table'

function App(): JSX.Element {

  const [alertToggle, setAlertToggle] = useState<boolean>(false)
  const [fruitList, setFruitList] = useState<Array<IFruit>>([])
  const [modalToggle, setModalToggle] = useState<boolean>(false)
  const [modalFruit, setModalFruit] = useState<IFruit>()

  useEffect(() => {
    getFruitList()
  }, [])

  const getFruitList = async () => {
    let res = await api.getFruitList()
    setFruitList(res.data)
  }

  const handleBestChange = async (fruit: IFruit) => {
    let updatedFruit = fruit
    updatedFruit.best = !updatedFruit.best
    const res = await api.updateFruit(updatedFruit)
    res === 200 ? getFruitList() : handleError("handleBestChange")
  }

  const handleError = (error: any) => {
    console.error(error)
    setAlertToggle(true)
  }

  const handleSubmit = async (id: number, name: string, best: boolean) => {
    if (id < 0) {
      const newFruit = { best: best, name: name }
      const res = await api.createFruit(newFruit)
      res === 200 ? getFruitList() : handleError("handleSubmit add")
    } else if (id >= 0) {
      const updatedFruit = { _id: id, name: name, best: best }
      const res = await api.updateFruit(updatedFruit)
      res === 200 ? getFruitList() : handleError("handleSubmit update")
    } else {
      console.log("handle submit unexpected error")
    }
    setModalToggle(false)
  }

  const handleRemove = async (fruit: IFruit) => {
    const res: number = await api.deleteFruit(fruit._id)
    res === 200 ? await getFruitList() : handleError("handleSubmit")
  }

  const displayAlert =
    <Alert
      onClose={() => { setAlertToggle(false) }}
      message={String(alertToggle)} />

  const displayFruitList = (best: boolean) => {
    return fruitList
      .filter((i: IFruit) => i.best === best)
      .map((i: IFruit) =>
        <Row
          key={`${i._id}${i.name}`}
          fruit={i}
          handleRemove={() => { handleRemove(i) }}
          handleEdit={() => { handleBestChange(i) }}
          openModal={() => {
            setModalToggle(true)
            setModalFruit(i)
          }} />)
  }

  const displayModal = () => {
    if (modalFruit) {
      return (
        <Modal
          form={<Form
            handleSubmit={handleSubmit}
            id={modalFruit._id}
            name={modalFruit.name}
            best={modalFruit.best} />}
          onClose={() => { setModalToggle(false) }}
          title="This is a modal" />
      )
    } else {
      console.log("No modal fruit defined yet")
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fruit dashboard</h1>
        {alertToggle && displayAlert}
        <Form handleSubmit={handleSubmit} />
        <Table rows={displayFruitList(true)} title="True table" />
        <Table rows={displayFruitList(false)} title="False table" />
      </header>
      {modalToggle && displayModal()}
    </div>
  )
}

export default App
