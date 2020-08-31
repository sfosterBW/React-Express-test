import React, { FC } from 'react'
import styles from './Banner.module.css'

interface Props {
  theme?: 'one' | 'two' | 'three';
  size: 'small' | 'medium' | 'large';
  title: string;
}

const Banner: FC<Props> = ({ theme = 'one', size, title }) => {
  return (
    <section className={styles.wrapper} data-testid="wrapper">
      <div className={`${styles.hero} ${styles[size]} ${styles[theme]}`}>
        <h1 className={styles.title} data-testid="title">
          {title}
        </h1>
      </div>
    </section>
  )
}

export default Banner
