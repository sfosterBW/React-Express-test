import React, { FC, useState, useEffect } from 'react'
import { createFruit, deleteFruit, fetchFruit, updateFruit } from '../utils/api'
import { IFruit } from '../utils/interfaces'
import { toggleAlert, toggleModal } from '../utils/actions'
import { useDispatch } from 'react-redux'
import './App.scss'
import Alert from './Alert'
import Form from './Form'
import Modal from './Modal'
import Row from './Row'
import Table from './Table'

interface Props {

}

const App: FC<Props> = () => {

  const [fruitList, setFruitList] = useState<Array<IFruit>>([])
  const [modalFruit, setModalFruit] = useState<IFruit>()
  const dispatch = useDispatch()

  useEffect(() => {
    async function initList() {
      const res = await fetchFruit()
      res ? setFruitList(res.data) : setFruitList([])
    }
    initList()
  }, [])

  const handleBestChange = async (fruit: IFruit) => {
    const updatedFruit = fruit
    updatedFruit.best = !updatedFruit.best
    const res = await updateFruit(updatedFruit)
    res.status === 200 ? setFruitList(res.data) : handleError("handleBestChange")
  }

  const handleError = (error: any) => {
    console.error("App", error)
    dispatch(toggleAlert(true))
  }

  const handleSubmit = async (fruit: IFruit) => {
    if (fruit._id < 0) {
      const res = await createFruit(fruit)
      res.status === 200 ? setFruitList(res.data) : handleError("handleSubmit add")
    } else if (fruit._id >= 0) {
      const res = await updateFruit(fruit)
      res.status === 200 ? setFruitList(res.data) : handleError("handleSubmit update")
    } else {
      console.log("handle submit unexpected error")
    }
    dispatch(toggleModal(false))
  }

  const handleRemove = async (fruit: IFruit) => {
    const res = await deleteFruit(fruit._id)
    res.status === 200 ? setFruitList(res.data) : handleError("handleSubmit")
  }

  const displayFruitList = (best: boolean) => {
    const fruitRows = fruitList
      .filter((i: IFruit) => i.best === best)
      .map((i: IFruit) =>
        <Row
          key={`${i._id}${i.name}`}
          fruit={i}
          handleRemove={() => { handleRemove(i) }}
          handleEdit={() => { handleBestChange(i) }}
          openModal={() => {
            dispatch(toggleModal(true))
            setModalFruit(i)
          }} />)
    const tableBody = <tbody>{fruitRows}</tbody>
    return tableBody
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fruit dashboard</h1>
        <Alert />
        <Form handleSubmit={handleSubmit} />
        <Table rows={displayFruitList(true)} title="True table" />
        <Table rows={displayFruitList(false)} title="False table" />
      </header>
      <Modal fruit={modalFruit} handleSubmit={handleSubmit} title="This is a modal" />
    </div>
  )
}

export default App
