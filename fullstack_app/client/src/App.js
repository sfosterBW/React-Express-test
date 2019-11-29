import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bestFruit: "",
      fruitList: [],
    };
    this.getFruitList = this.getFruitList.bind(this)
    this.displayFruitList = this.displayFruitList.bind(this)
    this.addFruitToList = this.addFruitToList.bind(this)
  }

  getBestFruit(word="") {
    fetch(`/fruit-api/best-fruit/${word}`)
      .then(res => res.text())
      .then(res => this.setState({ bestFruit: res }))
      .catch(e => console.log(e))
  }

  getFruitList() {
    fetch("/fruit-api/list")
      .then(res => res.json())
      .then(res => this.setState({ fruitList: res }))
      .catch(e => console.log(e))
  }

  displayFruitList() {
      return this.state.fruitList.map(i => <li key={i.toString()}>{i}</li>)
  }

  async addFruitToList() {
    let newFruit = document.getElementById("fruitInput").value
    const res = await fetch("/fruit-api/new", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify({ new: newFruit }) // body data type must match "Content-Type" header
    })
    this.setState({bestFruit: newFruit})
    return await res;
  }

  componentWillMount() {
    let fruit = "Apple"
    this.getBestFruit(fruit)
    this.getFruitList()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p className="App-intro">The best fruit is {this.state.bestFruit}</p>
          <ul>
            {this.displayFruitList()}
          </ul>
          <input id="fruitInput"></input>
          <button onClick={this.addFruitToList}>Add the best new fruit</button>
          <button onClick={this.getFruitList}>Update the fruit list</button>
        </header>
      </div>
    );
  }
}

export default App;
