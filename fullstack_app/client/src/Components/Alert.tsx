import React, { FC, FormEvent } from 'react'
import { InitialState } from '../utils/reducers'
import { toggleAlert } from '../utils/actions'
import { useDispatch, useSelector } from 'react-redux'

interface Props {

}

interface StateProps {
  value: boolean
}

const Alert: FC<Props> = () => {

  const { value } = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return { value: state.value }
    }
  )
  const dispatch = useDispatch()

  const displayAlert = () => {
    if(value) {
      return (
        <div>
          <p>{String(value)}</p>
          <button onClick={(event: FormEvent) => {
            event.preventDefault()
            dispatch(toggleAlert(!value))
          }}>&times;</button>
        </div>
      )
    } else {
      return null
    }
  }

  return (
    <div>
      { displayAlert() }
    </div>
  )
}

export default Alert
