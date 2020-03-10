import React, { FC, FormEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../utils/store'
import { toggleAlert } from '../../utils/actions'
import styles from './Alert.module.css'

const Alert: FC = () => {

  const selectToggle = (state: RootState) => state.alert.toggle
  const toggle = useSelector(selectToggle)
  const dispatch = useDispatch()

  const displayAlert = () => {
    if(toggle) {
      return (
        <section className={styles.alert}>
          <p className="alert-text">{String(toggle)}</p>
          <button className="alert-button" onClick={(event: FormEvent) => {
            event.preventDefault()
            dispatch(toggleAlert(!toggle))}
          }>&times;</button>
        </section>
      )
    } else {
      return null
    }
  }

  return (
    <div className="alert-wrapper">{ displayAlert() }</div>
  )
}

export default Alert
