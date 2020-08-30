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
  const dispatch = useDispatch()

  const [activeToggle, setActiveToggle] = useState<boolean>(active)
  
  const { id, name, best, description } = fruit

  return (
    <div className={styles.row} data-testid="item">
      <div
        className={styles.header}
        onClick={() => setActiveToggle(!activeToggle)}
      >
        <div className={styles.section}>
          <h3 className={styles.subtitle} data-testid="item-title">
            {name}
          </h3>
        </div>
      </div>
      <div
        className={styles.active}
        style={{
          height: activeToggle ? "calc(120px + 12vmin)" : "0",
          transition: "all 0.5s"
        }}
      >
        <div className={styles.sectionRow}>
          <h4 className={styles.subtitle}>
            Description
          </h4>
          <p className={styles.description} data-testid="item-description">
            {description ? `${description}` : "No description added yet"}
          </p>
        </div>
        <div className={styles.section}>
          <h4 className={styles.subtitle}>
            Best
          </h4>
          <input
            checked={best}
            className={styles.button}
            id={id}
            name={id}
            onChange={() => {
              dispatch(updateFruit({ ...fruit, best: !best }))
            }}
            type="checkbox"
            value={fruit.id}
          />
          <label data-testid="item-best" htmlFor={id}>
            {`${best}`}
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
            onClick={() => dispatch(removeFruit(id))}
            value={`${id}`}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default FruitItem
