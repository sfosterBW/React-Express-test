//Libraries
import React, { Component, ReactNode } from 'react'
//Types
import { Fruit } from './interfaces'


interface Props {
  fruit: Fruit
  onChange: (e: any) => void
}

export default class Row extends Component<Props> {

  render(): ReactNode {
    const fruit: Fruit = this.props.fruit
    const onChange = this.props.onChange
    return (
      <tr>
        <td>
          <label htmlFor={`${fruit._id}${fruit.name}`}>{fruit.name}</label>
        </td>
        <td>
          <p>{fruit.best.toString()}</p>
        </td>
        <td>
          <input
            id={fruit._id.toString()}
            className="checkbox"
            name={`${fruit._id}${fruit.name}`}
            checked={fruit.best}
            type="checkbox"
            onChange={onChange}
          />
        </td>
      </tr>
    )
  }
}
