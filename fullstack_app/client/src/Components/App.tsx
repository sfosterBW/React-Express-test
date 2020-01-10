import React, { useState, useEffect } from 'react'
import * as api from '../api'
import { Fruit } from './interfaces'
import './App.css'
import Alert from './Alert'
import Form from './Form'
import Modal from './Modal'
import Row from './Row'
import Table from './Table'

function App(): JSX.Element {

  const [alertToggle, setAlertToggle] = useState<boolean>(false)
  const [fruitList, setFruitList] = useState<Array<Fruit>>([])
  const [modalToggle, setModalToggle] = useState<boolean>(false)

  useEffect(() => {
    getFruitList()
  }, [])

  const getFruitList = async () => {
    let res = await api.getFruitList()
    setFruitList(res.data)
  }

  const handleBestChange = async (id: number) => {
    const fruit = fruitList.find(i => i._id === id)
    if (fruit) {
      fruit.best = !fruit.best
      const res = await api.updateFruit(fruit)
      res === 200 ? getFruitList() : handleError("handleBestChange")
    } else {
      alert("That fruit doesn't seem to exist")
    }
  }

  const handleError = (error: any) => {
    console.error(error)
    setAlertToggle(true)
  }

  const handleFormSubmit = async (best: boolean, name: string) => {
    const newFruit = {best: best, name: name}
    const res = await api.createFruit(newFruit)
    res !== 200 && handleError("handleFormSubmit")
    await getFruitList()
  }

  const handleRemoveSubmit = async (id: number) => {
    const res: number = await api.deleteFruit(id)
    res === 200 ? await getFruitList() : handleError("handleFormSubmit")
  }

  const displayAlert =
    <Alert
      onClose={() => { setAlertToggle(false) }}
      title={String(alertToggle)} />

  const displayFruitList = (best: boolean) => {
    return fruitList
      .filter((i: Fruit) => i.best === best)
      .map((i: Fruit) =>
        <Row
          key={`${i._id}${i.name}`}
          fruit={i}
          handleRemove={() => { handleRemoveSubmit(i._id) }}
          handleEdit={() => { handleBestChange(i._id) }}
          openModal={() => {setModalToggle(true)}} />)
  }

  const displayModal = <Modal
    form={<Form handleSubmit={ handleFormSubmit} />}
    onClose={() => { setModalToggle(false) }}
    title="This is a modal" />

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fruit dashboard</h1>
        {alertToggle && displayAlert}
        <Form handleSubmit={handleFormSubmit} />
        <Table
          rows={displayFruitList(true)}
          title="True table" />
        <Table
          rows={displayFruitList(false)}
          title="False table" />
      </header>
      {modalToggle && displayModal}
    </div>
  )
}

export default App
