import React, { Component, ReactNode } from 'react';

interface Props{
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
          <label htmlFor="fruitName">Add a fruit:</label>
          <input
            id="fruitName"
            name="fruitName"
            type="text"
            onChange={onChange} />
        </div>
        <div className="input-wrapper">
          <label htmlFor="fruitBest">Best:</label>
          True<input
            type="radio"
            name="fruitBest"
            value="true"
            onChange={onChange} />
          False<input
            type="radio"
            name="fruitBest"
            value="false"
            onChange={onChange} checked />
        </div>
        <button onClick={onClick}>Add new fruit</button>
      </div>
    )
  }
}
