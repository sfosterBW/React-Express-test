import React, { FC } from 'react'

interface Props {
  onClose: () => void
  title: string
}

const Alert: FC<Props> = ({ onClose, title }) => {
  return (
    <div>
      <p>{title}</p>
      <button onClick={onClose}>&times;</button>
    </div>
  )
}

export default Alert
