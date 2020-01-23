import React, { FC, useState, useEffect } from 'react'
import { createFruit, deleteFruit, fetchFruit, updateFruit } from '../utils/api'
import { IFruit } from '../utils/interfaces'
import './App.scss'
import Alert from './Alert'
import Form from './Form'
import Modal from './Modal'
import Row from './Row'
import Table from './Table'

const App: FC = () => {

  const [alertToggle, setAlertToggle] = useState<boolean>(false)
  const [fruitList, setFruitList] = useState<Array<IFruit>>([])
  const [modalToggle, setModalToggle] = useState<boolean>(false)
  const [modalFruit, setModalFruit] = useState<IFruit>()

  useEffect(() => {
    async function initList() {
      let defaultList = await fetchFruit()
      setFruitList(defaultList.data)
    }
    initList()
  }, [])

  const getFruitList = async () => {
    const res = await fetchFruit()
    res.status === 200 ? setFruitList(res.data) : handleError(res)
  }

  const handleBestChange = async (fruit: IFruit) => {
    let updatedFruit = fruit
    updatedFruit.best = !updatedFruit.best
    const res = await updateFruit(updatedFruit)
    res === 200 ? await getFruitList() : handleError("handleBestChange")
  }

  const handleError = (error: any) => {
    console.error(error)
    setAlertToggle(true)
  }

  const handleSubmit = async (fruit: IFruit) => {
    if (fruit._id < 0) {
      const res = await createFruit(fruit)
      res === 200 ? getFruitList() : handleError("handleSubmit add")
    } else if (fruit._id >= 0) {
      const res = await updateFruit(fruit)
      res === 200 ? await getFruitList() : handleError("handleSubmit update")
    } else {
      console.log("handle submit unexpected error")
    }
    setModalToggle(false)
  }

  const handleRemove = async (fruit: IFruit) => {
    const res: number = await deleteFruit(fruit._id)
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
          form={<Form handleSubmit={handleSubmit} fruit={modalFruit} />}
          onClose={() => { setModalToggle(false) }}
          title="This is a modal" />
      )
    } else {
      console.log("No modal fruit defined yet")
      return null
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
