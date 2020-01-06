import React, { FC } from 'react'

interface Props {
  best: boolean
  name: string
  handleChange: (event: any) => void
  handleSubmit: (event: any) => void
}

const Form: FC<Props> = ({ best, name, handleChange, handleSubmit }) => {
  return (
    <form className="fruit-form" onSubmit={handleSubmit}>
      <h2>List out your favourite fruit</h2>
      <div className="input-wrapper">
        <label htmlFor="name">Add a fruit:</label>
        <input
          name="name"
          onChange={handleChange}
          type="text"
          value={name} />
      </div>
      <div className="input-wrapper">
        <label htmlFor="best">Best:</label>
        <input
          checked={best}
          name="best"
          onChange={handleChange}
          type="checkbox"
          value={best.toString()} />
      </div>
      <button>Add new fruit</button>
    </form>
  )
}

export default Form
