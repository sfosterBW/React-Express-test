import React, { FC } from 'react'
import styles from './Banner.module.css'

interface Props {
  flavour?: "flavourOne" | "flavourTwo" | "flavourThree"
  size: "small" | "medium" | "large"
  title: string
}

const Banner: FC<Props> = ({flavour = "flavourOne", size, title}) => {
  return (
    <section className={styles.wrapper}>
      <div className={`${styles.hero} ${styles[size]} ${styles[flavour]}`}>
        <h1 className={styles.title}>{title}</h1>
      </div>
    </section>
  )
}

export default Banner
