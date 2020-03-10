import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { IFruit } from '../../utils/interfaces'
import fruitService from '../../utils/api'
import { openModal, removeFruit, updateFruit } from '../../utils/actions'
import styles from './Row.module.css'

interface Props {
  active?: boolean
  fruit: IFruit
}

const Row: FC<Props> = ({ active = false, fruit }) => {

  const [activeToggle, setActiveToggle] = useState<boolean>(active)
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
    <div className={styles.row}>
      <div className={styles.header} onClick={() => setActiveToggle(!activeToggle)}>
        <div className={styles.section}>
          <h3 className={styles.subtitle}>{fruit.name}</h3>
        </div>
      </div>
      <div className={`${styles.body} ${activeToggle ? styles.active : undefined}`}>
        <div className={styles.section}>
          <h3 className={styles.subtitle}>Best</h3>
          <input
            checked={fruit.best}
            className={styles.button}
            id={`${fruit._id}`}
            name={`${fruit._id}`}
            onChange={() => handleEdit(fruit)}
            type="checkbox"
            value={fruit._id} />
          <label htmlFor={`${fruit._id}`}>{fruit.best.toString()}</label>
        </div>
        <div className={styles.section}>
          <h3 className={styles.subtitle}>Edit</h3>
          <button
            className={styles.button}
            name="modal"
            onClick={() => dispatch(openModal(fruit))}>
            Update
          </button>
          <button
            className={styles.button}
            name="remove"
            onClick={() => handleRemove(fruit)}
            value={`${fruit._id}`}>
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default Row
