import React, { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../utils/store'
import { toggleAlert } from '../../utils/actions'
import styles from './Alert.module.css'

const Alert: FC = () => {
  const selectToggle = (state: RootState) => state.alert.toggle
  const toggle = useSelector(selectToggle)
  const dispatch = useDispatch()

  if(!toggle) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <section className={styles.alert}>
        <p className={styles.message}>{String(toggle)}</p>
        <button
          className={styles.button}
          onClick={() => {dispatch(toggleAlert(!toggle))}}
        >
          &times;
        </button>
      </section>
    </div>
  )
}

export default Alert
