import React, { FC } from 'react'
import { Fruit } from '../interfaces'

interface Props {
  fruit: Fruit
  handleEdit: () => void
  handleRemove: () => void
  openModal: () => void
}

const Row: FC<Props> = ({ fruit, handleEdit, handleRemove, openModal }) => {
  return (
    <tr>
      <td>{fruit._id}</td>
      <td>
        <label htmlFor={`${fruit._id}`}>{fruit.name}</label>
      </td>
      <td>
        <p>{fruit.best.toString()}</p>
      </td>
      <td>
        <input
          checked={fruit.best}
          name={`${fruit._id}`}
          onChange={handleEdit}
          type="checkbox"
          value={fruit._id} />
      </td>
      <td>
        <button name="modal" onClick={openModal} value={`${fruit._id}`}>
          Update
        </button>
      </td>
      <td>
        <button name="remove" onClick={handleRemove} value={`${fruit._id}`}>
          Remove
          </button>
      </td>
    </tr>
  )
}

export default Row
