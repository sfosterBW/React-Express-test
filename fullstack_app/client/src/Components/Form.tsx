import React, { Component, ReactNode } from 'react';

interface Props{
  name: string;
  onChange: (e: any) => void;
  onClick: (e: any) => void;
}

export default class Row extends Component<Props> {

  render(): ReactNode{
    const onChange = this.props.onChange
    const onClick = this.props.onClick
    return(
      <div id="fruit-form">
        <h2>List out your favourite fruit</h2>
        <div className="input-wrapper">
          <label htmlFor="newFruitName">Add a fruit:</label>
          <input
            id="newFruitName"
            name="newFruitName"
            type="text"
            value={this.props.name}
            onChange={onChange} />
        </div>
        <div className="input-wrapper">
          <label htmlFor="newFruitBest">Best:</label>
          True<input
            type="radio"
            name="newFruitBest"
            value="true"
            onChange={onChange} />
          False<input
            type="radio"
            name="newFruitBest"
            value="false"
            onChange={onChange} />
        </div>
        <button onClick={onClick}>Add new fruit</button>
      </div>
    )
  }
}
