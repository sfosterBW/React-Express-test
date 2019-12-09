//Libraries
import axios from 'axios'
import React, { Component } from 'react'
//Styles
import './App.css';
//Types
import { Fruit } from './interfaces'
//Components
import Form from './Form'
import Row from './Row'
import Table from './Table'

interface Props {
  title: string;
}

interface State {
  fruitList: Fruit[]
  newFruitBest: boolean
  newFruitName: string
}

export default class App extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      fruitList: [],
      newFruitBest: false,
      newFruitName: "",
    }
    this.displayFruitList = this.displayFruitList.bind(this)
    this.handleBestChange = this.handleBestChange.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.updateFruit = this.updateFruit.bind(this)
  }

  //Convert to it's own child component
  displayFruitList(best: boolean) {
    return this.state.fruitList
      .filter((i: Fruit) => i.best === best)
      .map((i: Fruit) =>
        <Row
          key={`${i._id}${i.name}`}
          fruit={i}
          onChange={this.handleBestChange} />)
  }

  async getFruitList() {
    try {
      const res = await axios.get("/fruit-api/list")
      const fruitList: Fruit[] = res.data
      this.setState({ fruitList: fruitList })
      return res
    } catch (error) {
      console.log(error, "get fruit list")
    }
  }

  handleBestChange(event: any) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const id: number = Number(target.id)
    this.updateFruit(id, value)
  }

  handleFormChange(event: any) {
    const name = event.target.name
    const value = event.target.value
    const checked = event.target.checked
    console.log(name, value)
    if (name === "newFruitName" && value !== "") {
      this.setState({ newFruitName: value })
    } else if (name === "newFruitBest") {
      const best: boolean = checked
      this.setState({ newFruitBest: best })
    }
  }

  async handleFormSubmit() {
    const best = this.state.newFruitBest
    const name = this.state.newFruitName
    const newFruit = { name: name, best: best }
    if (name !== "") {
      try {
        const res = await axios.post("/fruit-api/new", { new: newFruit })
        this.getFruitList()
        this.setState({ newFruitName: "" })
        return res
      } catch (error) {
        console.log(error, "Add fruit")
      }
    } else {
      alert("Put in a name. You didn't put in a name. Why not?")
    }
  }

  async updateFruit(id = 0, best = false) {
    const updateFruitId = id
    try {
      const res = await axios.put("/fruit-api/update", {
        id: updateFruitId,
        value: best
      })
      this.getFruitList()
      return res
    } catch (error) {
      console.log(error, "Update fruit")
    }
  }

  componentDidMount() {
    this.getFruitList()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Fruit dashboard</h1>
          <Form
            best={this.state.newFruitBest}
            name={this.state.newFruitName}
            onChange={this.handleFormChange}
            onClick={this.handleFormSubmit} />
          <Table
            rows={this.displayFruitList(true)}
            title="True table" />
          <Table
            rows={this.displayFruitList(false)}
            title="False table" />
        </header>
      </div>
    )
  }
}
