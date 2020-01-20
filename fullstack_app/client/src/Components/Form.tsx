import React, { FC, FormEvent, useState } from 'react'
import { InputCheckbox, InputText } from './Input'

interface Props {
  best?: boolean
  handleSubmit: (id: number, name: string, best: boolean) => void
  id?: number
  name?: string
}

const Form: FC<Props> = ({ best = false, handleSubmit, id = -1, name = "" }) => {

  const [bestInput, setBest] = useState<boolean>(best)
  const [nameInput, setName] = useState<string>(name)

  const reset = () => {
    setBest(best)
    setName(name)
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
      handleSubmit(id, nameInput, bestInput)
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
