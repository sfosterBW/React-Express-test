import React, { FC, useState } from 'react'
import { IFruit } from '../../utils/interfaces'
import FruitItem from '../FruitItem/FruitItem'
import styles from './List.module.css'

interface Props {
  fruits: IFruit[]
}

const List: FC<Props> = ({ fruits }) => {

  const type: boolean | undefined = undefined
  const [filter, setFilter] = useState<boolean | undefined>(type)

  const displayFruitList = () => {
    const filterFruit = fruits.filter((i) => filter === i.best || filter === undefined)
    if (filterFruit.length > 0) {
      return filterFruit.map((i) => <FruitItem key={i.id} fruit={i} />)
    } else {
      return <p>Nothing here...</p>
    }
  }

  const setter = (value: boolean | undefined) => () => setFilter(value)

  return (
    <section className={styles.wrapper}>
      <div className={styles.filters}>
        <button className={styles.filter} onClick={setter(undefined)}>All</button>
        <button className={styles.filter} onClick={setter(true)}>Best</button>
        <button className={styles.filter} onClick={setter(false)}>Not best</button>
      </div>
      <div className={styles.devices}>
        {displayFruitList()}
      </div>
    </section>
  )
}

export default List
