import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fruitList: [],
    };
    this.displayFruitList = this.displayFruitList.bind(this)
    this.addFruitToList = this.addFruitToList.bind(this)
    this.updateFruitInList = this.updateFruitInList.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }


  getFruitList() {
    axios.get("/fruit-api/list")
      .then(res => {
        const fruitList = res.data
        this.setState({ fruitList: fruitList })
      })
      .catch(e => console.log(e))
  }

  //Convert to it's own child component
  displayFruitList(best) {
      return this.state.fruitList
        .filter(i => i.best === best)
        .map(i => <li key={i._id + i.name}><input id={i._id} class="checkbox" name={i._id + i.name} checked={i.best} type="checkbox"onChange={this.handleChange}/><label htmlFor={i.name}>{i.name}</label></li>)
  }

  async addFruitToList() {
    let newFruit = document.getElementById("fruitInput").value
    const res = await axios.post("/fruit-api/new", { new: newFruit })
    this.getFruitList()
    return await res;
  }

  async updateFruitInList(id = 0, best = false) {
    let updateFruit = id
    const res = await axios.put("/fruit-api/update", { id: updateFruit, value: best })
    this.getFruitList()
    return await res;
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const id = Number(target.id);
    this.updateFruitInList(id, value)
  }

  componentWillMount() {
    this.getFruitList()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>List out your favourite fruit</h2>
          <input id="fruitInput"></input>
          <button onClick={this.addFruitToList}>Add the best new fruit</button>
          <h3>Best fruit</h3>
            <ul>
              {this.displayFruitList(true)}
            </ul>
          <h3>Not best fruit</h3>
            <ul>
              {this.displayFruitList(false)}
            </ul>
        </header>
      </div>
    );
  }
}

export default App;
