//Libraries
import React, { FunctionComponent, ReactNode } from 'react'

interface Props {
  rows: ReactNode
  title: string
}

const Table: FunctionComponent<Props> = ({ rows, title }) => {
  return (
    <div id="fruit-table">
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            <th>Fruit</th>
            <th>Best?</th>
            <th>Edit</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}

export default Table
