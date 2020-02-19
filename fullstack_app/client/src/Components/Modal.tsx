import React, { FC } from 'react'
import Form from './Form'
import { IFruit } from '../utils/interfaces'
import { RootState } from '../utils/store'
import { toggleModal } from '../utils/actions'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
  fruit: IFruit | undefined
  handleSubmit: (fruit: IFruit) => void
  title: string
}

const Modal: FC<Props> = ({ fruit, handleSubmit, title }) => {

  const selectToggle = (state: RootState) => state.modal.toggle
  const toggle = useSelector(selectToggle)
  const dispatch = useDispatch()

  const displayModal = () => {
    if (toggle) {
      if (fruit) {
        return (
          <div className="modal-wrapper">
            <div className="modal">
              <h2 className="modal-title">{title}</h2>
              <Form handleSubmit={handleSubmit} fruit={fruit} />
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
    } else {
      return null
    }
  }

  return (
    <div>{displayModal()}</div>
  )
}

export default Modal
