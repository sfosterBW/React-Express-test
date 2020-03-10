import React, { FC, useState } from 'react'
import { IFruit } from '../../utils/interfaces'
import Row from '../Row/Row'
import styles from './Table.module.css'

interface Props {
  fruits: IFruit[]
}

const Table: FC<Props> = ({ fruits }) => {

  const type: boolean | undefined = undefined
  const [filter, setFilter] = useState<boolean|undefined>(type)

  const displayFruitList = () => {
    const filteredFruit = fruits
      .filter((i) => filter === i.best || filter === undefined)
    if(filteredFruit.length > 0) {
      return filteredFruit
        .map((i) => <Row key={`${i._id}${i.name}`} fruit={i} />)
    } else {
      return <p>Nothing here...</p>
    }
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.filters}>
        <button className={styles.filter} onClick={() => setFilter(undefined)}>All</button>
        <button className={styles.filter} onClick={() => setFilter(true)}>Best</button>
        <button className={styles.filter} onClick={() => setFilter(false)}>Not best</button>
      </div>
      <div className={styles.devices}>
        {displayFruitList()}
      </div>
    </section>
  )
}

export default Table
