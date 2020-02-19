import React, { FC, FormEvent } from 'react'

interface Props {
  handleClick: (event: FormEvent) => void
  toggle: boolean
}

const Alert: FC<Props> = ({ handleClick, toggle }) => {

  const displayAlert = () => {
    if(toggle) {
      return (
        <div>
          <p>{String(toggle)}</p>
          <button onClick={handleClick}>&times;</button>
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
