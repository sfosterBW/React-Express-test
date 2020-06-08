import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Fruit } from '../../utils/interfaces'
import fruitService from '../../utils/api'
import {
  openModal,
  removeFruit,
  toggleAlert,
  updateFruit,
} from '../../utils/actions'
import styles from './FruitItem.module.css'

interface Props {
  active?: boolean
  fruit: Fruit
}

const FruitItem: FC<Props> = ({ active = false, fruit }) => {
  const [activeToggle, setActiveToggle] = useState<boolean>(active)
  const dispatch = useDispatch()

  const handleEdit = async (fruit: Fruit): Promise<void> => {
    const newFruit = { ...fruit, best: !fruit.best }
    try {
      const updatedFruit = await fruitService
        .updateFruit(newFruit)
      dispatch(updateFruit(updatedFruit))
    }
    catch (error) {
      console.log(error)
      dispatch(toggleAlert('edit error', true))
    }
  }

  const handleRemove = async (fruit: Fruit): Promise<void> => {
    try {
      const id = await fruitService.deleteFruit(fruit.id)
      dispatch(removeFruit(id))
    }
    catch (error) {
      console.log(error.response)
      dispatch(toggleAlert('remove error', true))
    }
  }

  const showHide = () => activeToggle ? "calc(60px + 8vmin)" : "0"

  return (
    <div className={styles.row}>
      <div
        className={styles.header}
        onClick={() => setActiveToggle(!activeToggle)}
      >
        <div className={styles.section}>
          <h3 className={styles.subtitle}>
            {fruit.name}
          </h3>
        </div>
      </div>
      <div
        className={styles.active}
        style={{ height: showHide(), transition: "all 0.5s" }}
      >
        <div className={styles.section}>
          <h4 className={styles.subtitle}>
            Best
          </h4>
          <input
            checked={fruit.best}
            className={styles.button}
            id={`${fruit.id}`}
            name={`${fruit.id}`}
            onChange={() => handleEdit(fruit)}
            type="checkbox"
            value={fruit.id}
          />
          <label htmlFor={`${fruit.id}`}>
            {fruit.best.toString()}
          </label>
        </div>
        <div className={styles.section}>
          <h4 className={styles.subtitle}>
            Edit
          </h4>
          <button
            className={styles.button}
            name="modal"
            onClick={() => dispatch(openModal(fruit))}
          >
            Update
          </button>
          <button
            className={styles.button}
            name="remove"
            onClick={() => handleRemove(fruit)}
            value={`${fruit.id}`}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default FruitItem
