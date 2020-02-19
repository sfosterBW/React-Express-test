import React, { FC, FormEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../utils/store'
import { toggleAlert } from '../utils/actions'

const Alert: FC = () => {

  const selectToggle = (state: RootState) => state.alert.toggle
  const toggle = useSelector(selectToggle)
  const dispatch = useDispatch()

  const displayAlert = () => {
    if(toggle) {
      return (
        <div>
          <p>{String(toggle)}</p>
          <button onClick={(event: FormEvent) => {
            event.preventDefault()
            dispatch(toggleAlert(!toggle))}
          }>&times;</button>
        </div>
      )
    } else {
      return null
    }
  }

  return (
    <div>{ displayAlert() }</div>
  )
}

export default Alert
