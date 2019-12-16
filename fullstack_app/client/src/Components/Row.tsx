import React, { FC } from 'react'
import { Fruit } from './interfaces'

interface Props {
  fruit: Fruit
  handleChange: (event: any) => void
  handleClick: (event: any) => void
}

const Row: FC<Props> = ({ fruit, handleChange, handleClick }) => {
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
          checked={fruit.best}
          name={`${fruit._id}`}
          onChange={handleChange}
          type="checkbox"
          value={fruit._id} />
      </td>
      <td>
        <button name="remove" value={fruit._id} onClick={handleClick}>
          Remove
          </button>
      </td>
    </tr>
  )
}

export default Row
