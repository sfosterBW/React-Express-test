import React, { FC, useState } from 'react'
import { Fruit } from '../../utils/interfaces'
import FruitItem from '../FruitItem/FruitItem'
import styles from './List.module.css'

const List: FC<{fruits: Fruit[]}> = ({ fruits }) => {
  const type: boolean | undefined = undefined
  const [filter, setFilter] = useState<boolean | undefined>(type)

  const displayFruitList = () => {
    const filterFruit = fruits
      .filter((i) => filter === i.best || filter === undefined)

    if (filterFruit.length < 1) {
      return <p>Nothing here...</p>
    }

    return filterFruit.map(fruit => <FruitItem key={fruit.id} fruit={fruit} />)
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
        {displayFruitList()}
      </div>
    </section>
  )
}

export default List