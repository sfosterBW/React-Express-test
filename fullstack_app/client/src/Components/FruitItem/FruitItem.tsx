import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { IFruit } from '../../utils/interfaces'
import fruitService from '../../utils/api'
import { openModal, removeFruit, updateFruit } from '../../utils/actions'
import styles from './FruitItem.module.css'

interface Props {
  active?: boolean
  fruit: IFruit
}

const FruitItem: FC<Props> = ({ active = false, fruit }) => {
  const [activeToggle, setActiveToggle] = useState<boolean>(active)
  const dispatch = useDispatch()

  const handleEdit = async (fruit: IFruit) => {
    try {
      const updatedFruit = await fruitService.updateFruit({...fruit, best: !fruit.best})
      dispatch(updateFruit(updatedFruit))
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleRemove = async (fruit: IFruit) => {
    const id = await fruitService.deleteFruit(fruit.id)
    dispatch(removeFruit(String(id)))
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
          <h3 className={styles.subtitle}>
            Best
          </h3>
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
          <h3 className={styles.subtitle}>
            Edit
          </h3>
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
