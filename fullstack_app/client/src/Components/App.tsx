import React, { Component } from 'react'
import * as api from '../api'
import { Fruit, NewFruit } from './interfaces'
import './App.css';
import Form from './Form'
import Modal from './Modal'
import Row from './Row'
import Table from './Table'

interface Props { }

interface State {
  fruitList: Fruit[]
  newFruit: NewFruit
  modal: boolean
}

function handleError(error: any) {
  console.log(error)
}

export default class App extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      fruitList: [],
      newFruit: {
        name: "",
        best: false
      },
      modal: false,
    }
    this.displayFruitList = this.displayFruitList.bind(this)
    this.getFruitList = this.getFruitList.bind(this)
    this.handleBestChange = this.handleBestChange.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleRemoveSubmit = this.handleRemoveSubmit.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }

  //Convert to it's own child component
  displayFruitList(best: boolean) {
    const { fruitList } = this.state
    return fruitList
      .filter((i: Fruit) => i.best === best)
      .map((i: Fruit) =>
        <Row
          key={`${i._id}${i.name}`}
          fruit={i}
          handleRemove={this.handleRemoveSubmit}
          handleEdit={this.handleBestChange}
          openModal={this.toggleModal} />)
  }

  async getFruitList() {
    const res: any = await api.getFruitList()
    this.setState({ fruitList: res.data })
    res.status !== 200 && handleError("getFruitList")
  }

  async handleBestChange(event: any) {
    const { value } = event.target
    const { fruitList } = this.state
    const fruit = fruitList.find(i => i._id === Number(value))
    if (fruit) {
      fruit.best = !fruit.best
      const res = await api.updateFruit(fruit)
      res !== 200 && handleError("handleBestChange")
      await this.getFruitList()
    } else {
      alert("That fruit doesn't seem to exist")
    }
  }

  handleFormChange(event: any) {
    const { name, value, checked } = event.target
    const { newFruit } = this.state
    let updatedFruit = newFruit
    name === "best" ? updatedFruit.best = checked : updatedFruit.name = value
    this.setState({ newFruit: updatedFruit })
  }

  async handleFormSubmit(event: any) {
    event.preventDefault()
    const { newFruit } = this.state
    if (newFruit.name !== "") {
      const res = await api.createFruit(newFruit)
      res === 200 ? this.resetForm() : handleError("handleFormSubmit")
      await this.getFruitList()
    } else {
      alert("Put in a name. You didn't put in a name. Why not?")
    }
  }

  async handleRemoveSubmit(event: any) {
    const { value } = event.target
    const id: number = Number(value)
    const res = await api.deleteFruit(id)
    res !== 200 && handleError("handleFormSubmit")
    await this.getFruitList()
  }

  resetForm() {
    this.setState(prevState => ({
      newFruit: { ...prevState.newFruit, name: "" }
    }))
  }

  toggleModal(event: any) {
    event.preventDefault()
    const { modal } = this.state
    this.setState({ modal: !modal })
  }

  async componentDidMount() {
    await this.getFruitList()
  }

  render() {
    const { modal, newFruit } = this.state

    const form =
      <Form
        best={newFruit.best}
        name={newFruit.name}
        onChange={this.handleFormChange}
        onClick={this.handleFormSubmit} />

    const displayModal =
      <Modal
        form={form}
        onClose={() => { this.setState({ modal: false }) }}
        title="This is a modal" />

    return (
      <div className="App">
        <header className="App-header">
          <h1>Fruit dashboard</h1>
          <Form
            best={newFruit.best}
            name={newFruit.name}
            onChange={this.handleFormChange}
            onClick={this.handleFormSubmit} />
          <Table
            rows={this.displayFruitList(true)}
            title="True table" />
          <Table
            rows={this.displayFruitList(false)}
            title="False table" />
        </header>
        {modal && displayModal}
      </div>
    )
  }
}
