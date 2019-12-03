import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

interface Props {
  title: string;
}

interface State {
  fruitList: Fruit[];
  addValue: string;
}

interface Fruit {
  _id: number,
  name: string,
  best: boolean;
}

class App extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      fruitList: [],
      addValue: ""
    };
    this.displayFruitList = this.displayFruitList.bind(this)
    this.addFruitToList = this.addFruitToList.bind(this)
    this.updateFruitInList = this.updateFruitInList.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleAddChange = this.handleAddChange.bind(this)
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
        <tr key={i._id.toString() + i.name}>
          <td>
            <label htmlFor={`${i._id}${i.name}`}>{i.name}</label>
          </td>
          <td>
            <p>{i.best.toString()}</p>
          </td>
          <td>
            <input
              id={i._id.toString()}
              className="checkbox"
              name={`${i._id}${i.name}`}
              checked={i.best}
              type="checkbox"
              onChange={this.handleChange}
            />
          </td>
      </tr>
      )
  }

  async addFruitToList() {
    let newFruit = this.state.addValue
    console.log(newFruit)
    let res = await axios.post("/fruit-api/new", { new: newFruit })
    this.getFruitList()
    return res;
  }

  handleAddChange(e: any) {
    const target = e.target
    const value = target.value
    this.setState({ addValue: value })
  }

  async updateFruitInList(id = 0, best = false) {
    let updateFruit = id
    let res = await axios.put("/fruit-api/update", { id: updateFruit, value: best })
    this.getFruitList()
    return res;
  }

  handleChange(e: any) {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const id: number = Number(target.id)
    this.updateFruitInList(id, value)
  }

  componentWillMount() {
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
              <input id="fruitName" name="fruitName" type="text" onChange={this.handleAddChange} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="fruitBest">Best:</label>
              True<input type="radio" name="fruitBest" value="true" onChange={this.handleChange} />
              False<input type="radio" name="fruitBest" value="false" onChange={this.handleChange} />
            </div>
            <button onClick={this.addFruitToList}>Add the best new fruit</button>
          </div>
          <div id="fruit-wrapper">
            <table>
              <tr>
                <th>Fruit</th>
                <th>Best?</th>
                <th>Edit</th>
              </tr>
                  {this.displayFruitList(true)}
                  {this.displayFruitList(false)}
            </table>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
