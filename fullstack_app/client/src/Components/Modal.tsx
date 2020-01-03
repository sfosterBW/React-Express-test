import React, { FC, ReactNode } from 'react'

interface Props {
  form: ReactNode
  onClose: (event: any) => void
  title: string
}

const Modal: FC<Props> = ({ form, onClose, title }) => {
  return (
    <div className="modal-wrapper">
      <div className="modal">
        <h2>{title}</h2>
        {form}
        <button className="closeButton" name="close" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  )
}

export default Modal
