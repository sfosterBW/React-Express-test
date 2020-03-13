import React, { FC } from 'react'
import { Link } from '@reach/router'
import styles from './Nav.module.css'

const Nav: FC = () => {

  return (
    <header>
      <nav className={styles.wrapper}>
        <div className={styles.left}>
          <Link to="/">
          <img
            alt="logo"
            className={styles.logo}
            src="https://img.icons8.com/cotton/64/000000/apple--v1.png" />
          </Link>
          <h2 className={styles.title}>Fruit Dashboard</h2>
        </div>
        <div className={styles.right}>
          <Link
            className={styles.link}
            to="add"
            rel="nofollower noreferrer"
            title="Add a new fruit to your list">
            Add new fruit
          </Link>
          <Link
            className={styles.link}
            to="edit"
            rel="nofollower noreferrer"
            title="View and edit your list of fruit">
            Edit fruit
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Nav
