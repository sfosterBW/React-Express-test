//Libraries
import React, { Component, ReactNode } from 'react'

interface Props {
  best: boolean
  name: string
  onChange: (event: any) => void
  onClick: (event: any) => void
}

export default class Row extends Component<Props> {

  render(): ReactNode {
    const onChange = this.props.onChange
    const onClick = this.props.onClick
    return (
      <div id="fruit-form">
        <h2>List out your favourite fruit</h2>
        <div className="input-wrapper">
          <label htmlFor="newFruitName">Add a fruit:</label>
          <input
            id="newFruitName"
            name="newFruitName"
            onChange={onChange}
            type="text"
            value={this.props.name} />
        </div>
        <div className="input-wrapper">
          <label htmlFor="newFruitBest">Best:</label>
          <input
            checked={this.props.best}
            name="newFruitBest"
            onChange={onChange}
            type="checkbox" />
        </div>
        <button onClick={onClick}>Add new fruit</button>
      </div>
    )
  }
}
