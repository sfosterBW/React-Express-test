import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Fruit } from '../../utils/interfaces'
import { openModal } from '../../Reducers/modalReducer'
import { removeFruit, updateFruit } from '../../Reducers/fruitReducer'
import styles from './FruitItem.module.css'

interface Props {
  active?: boolean
  fruit: Fruit
}

const FruitItem: FC<Props> = ({ active = false, fruit }) => {
  const [activeToggle, setActiveToggle] = useState<boolean>(active)
  const dispatch = useDispatch()

  const showHide = () => activeToggle ? "calc(120px + 12vmin)" : "0"

  return (
    <div className={styles.row} data-testid="fruit-item">
      <div
        className={styles.header}
        onClick={() => setActiveToggle(!activeToggle)}
      >
        <div className={styles.section}>
          <h3 className={styles.subtitle} data-testid="fruit-item-title">
            {fruit.name}
          </h3>
        </div>
      </div>
      <div
        className={styles.active}
        style={{ height: showHide(), transition: "all 0.5s" }}
      >
        <div className={styles.sectionRow}>
          <h4 className={styles.subtitle}>
            Description
          </h4>
          <p
            className={styles.description}
            data-testid="fruit-item-description"
          >
            {`"${fruit.description}"`}
          </p>
        </div>
        <div className={styles.section}>
          <h4 className={styles.subtitle}>
            Best
          </h4>
          <input
            checked={fruit.best}
            className={styles.button}
            id={`${fruit.id}`}
            name={`${fruit.id}`}
            onChange={() => {
              dispatch(updateFruit({ ...fruit, best: !fruit.best }))
            }}
            type="checkbox"
            value={fruit.id}
          />
          <label data-testid="fruit-item-best" htmlFor={`${fruit.id}`}>
            {fruit.best.toString()}
          </label>
        </div>
        <div className={styles.section}>
          <h4 className={styles.subtitle}>
            Edit
          </h4>
          <button
            className={styles.button}
            data-testid="update-button"
            name="modal"
            onClick={() => dispatch(openModal(fruit))}
          >
            Update
          </button>
          <button
            className={styles.button}
            data-testid="remove-button"
            name="remove"
            onClick={() => dispatch(removeFruit(fruit.id))}
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
