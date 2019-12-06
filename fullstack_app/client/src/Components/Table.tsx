import React, { Component, ReactNode } from 'react';

export default class Table extends Component {

  render(): ReactNode{
    return(
      <div id="fruit-table">
        <table>
          <thead>
            <tr>
              <th>Fruit</th>
              <th>Best?</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {this.props.children}
          </tbody>
        </table>
      </div>
    )
  }
}
