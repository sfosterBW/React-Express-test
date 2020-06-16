import React, { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../Reducers/store'
import { toggleAlert } from '../../Reducers/alertReducer'
import styles from './Alert.module.css'

const Alert: FC<{message: string}> = ({ message }) => {
  const selectToggle = (state: RootState) => state.alert.toggle
  const toggle = useSelector(selectToggle)
  const dispatch = useDispatch()

  if(!toggle) {
    return null
  }

  return (
    <div className={styles.wrapper} data-testid="alert-wrapper">
      <section className={styles.alert}>
        <strong>!!!</strong>
        <p className={styles.message}>
          {message}
        </p>
        <button
          className={styles.button}
          data-testid="close-button"
          onClick={() => {dispatch(toggleAlert(message, !toggle))}}
        >
          &times;
        </button>
      </section>
    </div>
  )
}

export default Alert
