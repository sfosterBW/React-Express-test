import React, { FC } from 'react'

interface Props {
  onClose: () => void
  message: string
}

const Alert: FC<Props> = ({ onClose, message }) => {
  return (
    <div>
      <p>{message}</p>
      <button onClick={onClose}>&times;</button>
    </div>
  )
}

export default Alert
