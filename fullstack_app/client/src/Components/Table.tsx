//Libraries
import React, { Component, ReactNode } from 'react'

interface Props{
  rows: ReactNode
  title: string
}

export default class Table extends Component<Props> {

  render(): ReactNode{
    return(
      <div id="fruit-table">
        <h2>{this.props.title}</h2>
        <table>
          <thead>
            <tr>
              <th>Fruit</th>
              <th>Best?</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{this.props.rows}</tbody>
        </table>
      </div>
    )
  }
}
