import React, { FC, useState } from 'react'

interface Props {
  best?: boolean
  handleSubmit: (event: any, best: boolean, name: string) => void
  name?: string
}

const Form: FC<Props> = ({ best = false, handleSubmit, name = "" }) => {

  const [nameInput, setName] = useState<string>(name)
  const [bestInput, setBest] = useState<boolean>(best)

  const setter = (set: any) =>
    (event: any) => {
      const { checked, value } = event.target
      const newValue = checked ? checked : value
      set(newValue)
    }

  const submit = (event: any) => {
    handleSubmit(event, bestInput, nameInput)
    setBest(best)
    setName(name)
  }

  return (
    <form className="fruit-form" onSubmit={(event: any) => submit(event)}>
      <h2>List out your favourite fruit</h2>
      <div className="input-wrapper">
        <label htmlFor="name">Add a fruit:</label>
        <input
          name="name"
          onChange={setter(setName)}
          type="text"
          value={nameInput} />
      </div>
      <div className="input-wrapper">
        <label htmlFor="best">Best:</label>
        <input
          checked={bestInput}
          name="best"
          onChange={setter(setBest)}
          type="checkbox"
          value={bestInput.toString()} />
      </div>
      <button>Add new fruit</button>
    </form>
  )
}

export default Form
