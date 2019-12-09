import React, { Component } from 'react';
import './App.css';
import Form from './Form'
import Row from './Row'
import Table from './Table'
import { Fruit } from './interfaces'
import axios from 'axios';

interface Props {
  title: string;
}

interface State {
  fruitList: Fruit[];
  newFruitBest: boolean;
  newFruitName: string;
}

class App extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      fruitList: [],
      newFruitBest: false,
      newFruitName: "",
    };
    this.displayFruitList = this.displayFruitList.bind(this)
    this.handleBestChange = this.handleBestChange.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.updateFruit = this.updateFruit.bind(this)
  }

  getFruitList() {
    axios.get("/fruit-api/list")
      .then(res => {
        const fruitList: Fruit[] = res.data
        this.setState({ fruitList: fruitList })
      })
      .catch(error => console.log(error, "get fruit list"))
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

  async handleFormSubmit() {
    const name = this.state.newFruitName
    const best = this.state.newFruitBest
    const newFruit = { name: name, best: best }
    if (name !== "") {
      try {
        let res = await axios.post("/fruit-api/new", { new: newFruit })
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

  handleFormChange(e: any) {
    const target = e.target
    const name = target.name
    const value = target.value
    console.log(target, name, value)
    if (name === "newFruitName" && value !== "") {
      this.setState({ newFruitName: value })
    } else if (name === "newFruitBest") {
      const best: boolean = value === "true" ? true : false
      this.setState({ newFruitBest: best })
    }
  }

  async updateFruit(id = 0, best = false) {
    let updateFruit = id
    try {
      let res = await axios.put("/fruit-api/update", { id: updateFruit, value: best })
      this.getFruitList()
      return res;
    } catch (error) {
      console.log(error, "Update fruit")
    }
  }

  handleBestChange(event: any) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const id: number = Number(target.id)
    this.updateFruit(id, value)
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
            name={this.state.newFruitName}
            onChange={this.handleFormChange}
            onClick={this.handleFormSubmit} />
          <Table title="True table" rows={this.displayFruitList(true)} />
          <Table title="False table" rows={this.displayFruitList(false)} />
        </header>
      </div>
    );
  }
}

export default App;
