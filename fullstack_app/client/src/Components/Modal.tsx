import React, { FC } from 'react'
import Form from './Form'
import { IFruit } from '../utils/interfaces'

interface Props {
  fruit: IFruit | undefined
  handleClick: () => void
  toggle: boolean
  title: string
}

const Modal: FC<Props> = ({ fruit, handleClick, title, toggle }) => {

  const displayModal = () => {
    if (toggle) {
      if (fruit) {
        return (
          <div className="modal-wrapper">
            <div className="modal">
              <h2 className="modal-title">{title}</h2>
              <Form fruit={fruit} />
              <button
                className="closeButton"
                name="close"
                onClick={handleClick}>
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
