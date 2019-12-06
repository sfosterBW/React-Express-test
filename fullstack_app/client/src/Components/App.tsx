import React, { Component } from 'react';
import './App.css';
import Row from './Row'
import Table from './Table'
import { Fruit } from './interfaces'
import axios from 'axios';

interface Props {
  title: string;
}

interface State {
  fruitList: Fruit[];
  addValue: string;
  bestValue: boolean;
}

class App extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      fruitList: [],
      addValue: "",
      bestValue: false,
    };
    this.displayFruitList = this.displayFruitList.bind(this)
    this.addFruit = this.addFruit.bind(this)
    this.updateFruit = this.updateFruit.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  getFruitList() {
    axios.get("/fruit-api/list")
      .then(res => {
        const fruitList: Fruit[] = res.data
        this.setState({ fruitList: fruitList })
      })
      .catch(e => console.log(e))
  }

  //Convert to it's own child component
  displayFruitList(best: boolean) {
    return this.state.fruitList
      .filter((i: Fruit) => i.best === best)
      .map((i: Fruit) =>
        <Row
          key={`${i._id}`}
          fruit={i}
          onChange={this.handleEdit}
        />)
  }

  async addFruit() {
    let name = this.state.addValue
    let best = this.state.bestValue
    if (name !== "") {
      let newFruit = { name: name, best: best }
      let res = await axios.post("/fruit-api/new", { new: newFruit })
      this.getFruitList()
      this.setState({ addValue: "", bestValue: false })
      return res;
    } else {
      alert("Put in a name. You didn't put in a name. Why not?")
    }
  }

  handleAdd(e: any) {
    const target = e.target
    if (target.name === "fruitName" && target.value !== "") {
      const value = target.value
      this.setState({ addValue: value })
    } else if (target.name === "fruitBest") {
      const value: boolean = target.value === "true" ? true : false
      this.setState({ bestValue: value })
    } else {
      console.log(target)
    }
  }

  async updateFruit(id = 0, best = false) {
    let updateFruit = id
    let res = await axios.put("/fruit-api/update", { id: updateFruit, value: best })
    this.getFruitList()
    return res;
  }

  handleEdit(e: any) {
    const target = e.target
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
          <div id="fruit-form">
            <h2>List out your favourite fruit</h2>
            <div className="input-wrapper">
              <label htmlFor="fruitName">Add a fruit:</label>
              <input id="fruitName" name="fruitName" type="text" onChange={this.handleAdd} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="fruitBest">Best:</label>
              True<input type="radio" name="fruitBest" value="true" onChange={this.handleAdd} />
              False<input type="radio" name="fruitBest" value="false" onChange={this.handleAdd} checked />
            </div>
            <button onClick={this.addFruit}>Add new fruit</button>
          </div>
          <Table>
            {this.displayFruitList(true)}
          </Table>
          <Table>
            {this.displayFruitList(false)}
          </Table>
        </header>
      </div>
    );
  }
}

export default App;
