import React, { FC, FormEvent, useState } from 'react'
import { InputCheckbox, InputText } from './Input'
import { IFruit } from '../interfaces'

interface Props {
  fruit?: IFruit
  handleSubmit: (fruit: IFruit) => void
}

const Form: FC<Props> = ({
  fruit = { _id: -1, name: "", best: false }, handleSubmit }) => {

  const [bestInput, setBest] = useState<boolean>(fruit.best)
  const [nameInput, setName] = useState<string>(fruit.name)

  const reset = () => {
    setBest(false)
    setName("")
  }

  const setter = (set: any) =>
    (event: any) => {
      const { checked, type, value } = event.target
      const newValue = type === "checkbox" ? checked : value
      set(newValue)
    }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (nameInput.length > 0) {
      const updateFruit: IFruit = fruit
      updateFruit.best = bestInput
      updateFruit.name = nameInput
      handleSubmit(updateFruit)
      reset()
    } else {
      alert("You need to add a name")
    }
  }

  return (
    <form className="fruit-form" onSubmit={(event) => submit(event)}>
      <h2>List out your favourite fruit</h2>
      <InputText
        handleChange={setter(setName)}
        label="Add a fruit:"
        name="name"
        value={nameInput} />
      <InputCheckbox
        checked={bestInput}
        handleChange={setter(setBest)}
        label="Is it best?:"
        name="name"
        value={bestInput.toString()} />
      <button>Add new fruit</button>
    </form>
  )
}

export default Form
