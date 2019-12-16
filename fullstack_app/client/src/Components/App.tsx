//Libraries
import axios from 'axios'
import React, { Component } from 'react'
//Styles
import './App.css';
//Types
import { Fruit, NewFruit } from './interfaces'
//Components
import Form from './Form'
import Row from './Row'
import Table from './Table'

interface Props {
  title: string;
}

interface State {
  fruitList: Fruit[]
  newFruit: NewFruit
}

export default class App extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      fruitList: [],
      newFruit: {
        name: "",
        best: false
      }
    }
    this.displayFruitList = this.displayFruitList.bind(this)
    this.getFruitList = this.getFruitList.bind(this)
    this.handleBestChange = this.handleBestChange.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleRemoveSubmit = this.handleRemoveSubmit.bind(this)
    this.removeFruit = this.removeFruit.bind(this)
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
          handleClick={this.handleRemoveSubmit}
          handleChange={this.handleBestChange} />)
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
    const { value } = event.target
    const { fruitList } = this.state
    const index: number = fruitList.findIndex(i => i._id === Number(value))
    const best: boolean = fruitList[index].best
    this.updateFruit(Number(value), !best)
  }

  handleFormChange(event: any) {
    const { name, value, checked } = event.target
    const { newFruit } = this.state
    let updatedFruit = newFruit
    if (name === "name") {
      updatedFruit.name = value
    } else if (name === "best") {
      updatedFruit.best = checked
    }
    this.setState({ newFruit: updatedFruit })
  }

  async handleFormSubmit() {
    const { newFruit } = this.state
    if (newFruit.name !== "") {
      try {
        const res = await axios.post("/fruit-api/new", { new: newFruit })
        let resetFruit = newFruit
        resetFruit.name = ""
        this.setState({ newFruit: resetFruit })
        return res
      }
      catch (error) {
        console.log(error, "Add fruit")
      }
      finally {
        await this.getFruitList()
      }
    } else {
      alert("Put in a name. You didn't put in a name. Why not?")
    }
  }

  handleRemoveSubmit(event: any) {
    const { name } = event.target
    const id: number = Number(name)
    this.removeFruit(id)
  }

  async removeFruit(id: number) {
    const deleteData = { params: { id: id } }
    try {
      return await axios.delete("/fruit-api/delete", deleteData)
    }
    catch (error) {
      console.log(error, "Remove fruit")
    }
    finally {
      await this.getFruitList()
    }
  }

  updateFruit(id = 0, best = false) {
    const fruit = { id: id, value: best }
    try {
      return axios.put("/fruit-api/update", fruit)
    }
    catch (error) {
      console.log(error, "Update fruit")
    }
    finally {
      this.getFruitList()
    }
  }

  async componentDidMount() {
    await this.getFruitList()
  }

  render() {
    const { newFruit } = this.state

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
      </div>
    )
  }
}
