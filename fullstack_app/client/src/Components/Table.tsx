import React, { FC } from 'react'
import { IFruit } from '../utils/interfaces'
import Row from './Row'

interface Props {
  fruits: IFruit[]
  title: string
  type: boolean
}

const Table: FC<Props> = ({ fruits, title, type }) => {

  const displayFruitList = (best: boolean) => {
    if (fruits) {
      const fruitRows = fruits
        .filter((i) => i.best === best)
        .map((i) => <Row key={`${i._id}${i.name}`} fruit={i} />)
      const tableBody = <tbody>{fruitRows}</tbody>
      return tableBody
    } else {
      return null
    }
  }

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
        {displayFruitList(type)}
      </table>
    </div>
  )
}

export default Table
