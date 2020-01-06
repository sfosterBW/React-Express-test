import React, { useState, useEffect } from 'react'
import * as api from '../api'
import { Fruit, NewFruit } from './interfaces'
import './App.css'
import Alert from './Alert'
import Form from './Form'
import Modal from './Modal'
import Row from './Row'
import Table from './Table'



function App(): JSX.Element{

  const [alertToggle, setAlertToggle] = useState<boolean>(false)
  const [editFruit, setEditFruit] = useState<Fruit | null>(null)
  const [fruitList, setFruitList] = useState<Array<Fruit>>([])
  const [newFruit, setNewFruit] = useState<NewFruit>({ name: "", best: false })
  const [modalToggle, setModalToggle] = useState<boolean>(false)

  useEffect(() => {
    getFruitList()
  }, [])

  //Convert to it's own child component
  const displayFruitList = (best: boolean) => {
    return fruitList
      .filter((i: Fruit) => i.best === best)
      .map((i: Fruit) =>
        <Row
          key={`${i._id}${i.name}`}
          fruit={i}
          handleRemove={(event) => { handleRemoveSubmit(event, i._id) }}
          handleEdit={(event) => { handleBestChange(event, i._id) }}
          openModal={() => {
            setModalToggle(true)
            setEditFruit(i)
          }} />)
  }

  const getFruitList = async () => {
    let res = await api.getFruitList()
    setFruitList(res.data)
  }

  const handleBestChange = async (event: any, id: number) => {
    event.preventDefault()
    const fruit = fruitList.find(i => i._id === id)
    if (fruit) {
      fruit.best = !fruit.best
      const res = await api.updateFruit(fruit)
      res !== 200 && handleError("handleBestChange")
      getFruitList()
    } else {
      alert("That fruit doesn't seem to exist")
    }
  }

  const handleError = (error: any) => {
    console.log(error)
    setAlertToggle(true)
  }

  const handleFormChange = (event: any) => {
    const { name, value, checked } = event.target
    let updateValue = ""
    if(name === "best") {
      updateValue = checked
    } else {
      updateValue = value
    }
    setNewFruit((newFruit) => ({...newFruit, [name]: updateValue}))
  }

  const handleFormSubmit = async (event: any) => {
    event.preventDefault()
    if (newFruit.name !== "") {
      const res = await api.createFruit(newFruit)
      res === 200 ? resetForm() : handleError("handleFormSubmit")
      await getFruitList()
    } else {
      alert("Put in a name. You didn't put in a name. Why not?")
    }
  }

  const handleRemoveSubmit = async (event: any, id: number) => {
    event.preventDefault()
    const res = await api.deleteFruit(id)
    res !== 200 && handleError("handleFormSubmit")
    await getFruitList()
  }

  const resetForm = () => {
    let updateFruit = newFruit
    updateFruit.name = ""
    setNewFruit(updateFruit)
  }

  const displayAlert =
    <Alert
      onClose={() => {setAlertToggle(false)}}
      title={String(alertToggle)} />

  const displayModal = <Modal
      form={<Form
        best={editFruit ? editFruit.best : false}
        name={editFruit ? editFruit.name : ""}
        handleChange={handleFormChange}
        handleSubmit={(event) => { handleFormSubmit(event) }} />}
      onClose={() => { setModalToggle(false) }}
      title="This is a modal" />

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fruit dashboard</h1>
        {alertToggle && displayAlert}
        <Form
          best={newFruit.best}
          name={newFruit.name}
          handleChange={(event) => {handleFormChange(event)}}
          handleSubmit={(event) => { handleFormSubmit(event) }} />
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
