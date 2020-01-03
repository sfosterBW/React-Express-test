import React, { FC } from 'react'

interface Props {
  best: boolean
  name: string
  onChange: (event: any) => void
  onClick: (event: any) => void
}

const Form: FC<Props> = ({ best, name, onChange, onClick }) => {
  return (
    <form className="fruit-form">
      <h2>List out your favourite fruit</h2>
      <div className="input-wrapper">
        <label htmlFor="name">Add a fruit:</label>
        <input
          name="name"
          onChange={onChange}
          type="text"
          value={name} />
      </div>
      <div className="input-wrapper">
        <label htmlFor="best">Best:</label>
        <input
          checked={best}
          name="best"
          onChange={onChange}
          type="checkbox" />
      </div>
      <button onClick={onClick}>Add new fruit</button>
    </form>
  )
}

export default Form
