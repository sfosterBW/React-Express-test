import React, { FC, useState } from 'react'
import { RootState } from '../../Reducers/store'
import { useSelector } from 'react-redux'
import FruitItem from '../FruitItem/FruitItem'
import styles from './List.module.css'

const List: FC = () => {
  const [filter, setFilter] = useState<boolean | undefined>(undefined)
  const fruits = useSelector((state: RootState) => state.fruit
    .filter((i) => filter === i.best || filter === undefined)
  )
  const filteredList = () => {

    if (!fruits || fruits.length < 1 ) {
      return <p>Nothing here...</p>
    }

    return fruits.map(fruit => <FruitItem key={fruit.id} fruit={fruit} />)
  }

  const setter = (value: boolean | undefined) => (): void => setFilter(value)

  return (
    <section className={styles.wrapper}>
      <div className={styles.filters}>
        <button
          className={styles.filter}
          data-testid="all-filter"
          onClick={setter(undefined)}
        >
          All
        </button>
        <button
          className={styles.filter}
          data-testid="best-filter"
          onClick={setter(true)}
        >
          Best
        </button>
        <button
          className={styles.filter}
          data-testid="not-best-filter"
          onClick={setter(false)}
        >
          Not best
        </button>
      </div>
      <div className={styles.devices}>
        {filteredList()}
      </div>
    </section>
  )
}

export default List
