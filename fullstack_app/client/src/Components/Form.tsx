import React, { FC, FormEvent, useState } from 'react'
import Input from './Input'

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
      const { checked, value } = event.target
      const newValue = checked ? checked : value
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
      <Input
        handleChange={setter(setName)}
        label="Add a fruit:"
        name="name"
        type="text"
        value={nameInput} />
      <Input
        checked={bestInput}
        handleChange={setter(setBest)}
        label="Is it best?:"
        name="name"
        type="checkbox"
        value={bestInput.toString()} />
      <button>Add new fruit</button>
    </form>
  )
}

export default Form
