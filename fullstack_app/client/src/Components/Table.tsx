import React, { FC, ReactNode } from 'react'

interface Props {
  rows: ReactNode
  title: string
}

const Table: FC<Props> = ({ rows, title }) => {
  return (
    <div className="fruit-table">
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fruit</th>
            <th>Best?</th>
            <th>Edit</th>
            <th>Update</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}

export default Table
