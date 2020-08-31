import React, { FC, useState } from 'react'
import { RootState } from '../../Reducers/store'
import { useSelector } from 'react-redux'
import FruitItem from '../FruitItem/FruitItem'
import styles from './List.module.css'

const List: FC = () => {
  const [filter, setFilter] = useState<boolean | undefined>(undefined)
  const fruits = useSelector((state: RootState) =>
    state.fruit.filter(fruit => filter === fruit.best || filter === undefined)
  )

  return (
    <section className={styles.wrapper}>
      <div className={styles.filters}>
        <button data-testid="all-filter" onClick={(): void => setFilter(undefined)}>
          All
        </button>
        <button data-testid="best-filter" onClick={(): void => setFilter(true)}>
          Best
        </button>
        <button data-testid="not-best-filter" onClick={(): void => setFilter(false)}>
          Not best
        </button>
      </div>
      <div className={styles.devices}>
        {(!fruits || fruits.length < 1) && <p>Nothing here...</p>}
        {fruits && fruits.map(fruit => <FruitItem key={fruit.id} fruit={fruit} />)}
      </div>
    </section>
  )
}

export default List
