import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { IFruit } from '../utils/interfaces'
import fruitService from '../utils/api'
import { openModal, removeFruit, updateFruit } from '../utils/actions'

interface Props {
  fruit: IFruit
}

const Row: FC<Props> = ({ fruit }) => {

  const dispatch = useDispatch()

  const handleEdit = (fruit: IFruit) => {
    const newFruit = fruit
    newFruit.best = !newFruit.best
    fruitService.updateFruit(newFruit).then(res => dispatch(updateFruit(res)))
  }

  const handleRemove = (fruit: IFruit) => {
    if(fruit._id){
      fruitService.deleteFruit(fruit._id).then((res) => dispatch(removeFruit(res)))
    } else {
      console.log("Fruit undefined", fruit)
    }
  }

  return (
    <tr>
      <td>
        <p>{fruit._id}</p>
      </td>
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
          onChange={() => handleEdit(fruit)}
          type="checkbox"
          value={fruit._id} />
      </td>
      <td>
        <button name="modal" onClick={() => dispatch(openModal(fruit))}>
          Update
        </button>
      </td>
      <td>
        <button
          name="remove"
          onClick={() => handleRemove(fruit)}
          value={`${fruit._id}`}>
          Remove
          </button>
      </td>
    </tr>
  )
}

export default Row
