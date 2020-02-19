import React, { FC } from 'react'
import { RootState } from '../utils/store'
import { useSelector, useDispatch } from 'react-redux'
import { toggleModal } from '../utils/actions'
import Form from './Form'
import { IFruit } from '../utils/interfaces'

interface Props {
  fruit: IFruit | undefined
  title: string
}

const Modal: FC<Props> = ({ fruit, title }) => {

  const selectToggle = (state: RootState) => state.modal.toggle
  const toggle = useSelector(selectToggle)
  const dispatch = useDispatch()

  const displayModal = () => {
    if (toggle && fruit) {
      return (
        <div className="modal-wrapper">
          <div className="modal">
            <h2 className="modal-title">{title}</h2>
            <Form fruit={fruit} />
            <button
              className="closeButton"
              name="close"
              onClick={() => dispatch(toggleModal(!toggle))}>
              &times;
              </button>
          </div>
        </div>
      )
    } else {
      console.log("Modal fruit undefined")
      return null
    }
  }

  return (
    <div>{displayModal()}</div>
  )
}

export default Modal
