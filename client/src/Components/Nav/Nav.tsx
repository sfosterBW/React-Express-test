import React, { FC } from 'react'
import { Link } from '@reach/router'
import styles from './Nav.module.css'

const Nav: FC = () => {
  return (
    <header>
      <nav className={styles.wrapper}>
        <div className={styles.left}>
          <Link data-testid="logo-link" to="/">
            <img
              alt="logo"
              className={styles.logo}
              src="https://img.icons8.com/cotton/64/000000/apple--v1.png"
            />
          </Link>
          <div className={styles.title} id="title">
            Fruit Dashboard
          </div>
        </div>
        <div className={styles.right}>
          <Link
            className={styles.link}
            data-testid="home-link"
            to="/"
            rel="nofollower noreferrer"
            title="Home page"
          >
            Home
          </Link>
          <Link
            className={styles.link}
            data-testid="add-link"
            to="add"
            rel="nofollower noreferrer"
            title="Add a new fruit to your list"
          >
            Add new fruit
          </Link>
          <Link
            className={styles.link}
            data-testid="edit-link"
            to="edit"
            rel="nofollower noreferrer"
            title="View and edit your list of fruit"
          >
            Edit fruit
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Nav
