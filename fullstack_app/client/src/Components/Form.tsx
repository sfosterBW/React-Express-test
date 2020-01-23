import React, { FC, FormEvent, useState } from 'react'
import { InputCheckbox, InputText } from './Input'
import { useField } from '../utils/hooks'
import { IFruit } from '../utils/interfaces'

interface Props {
  fruit?: IFruit
  handleSubmit: (fruit: IFruit) => void
}

const Form: FC<Props> = ({
  fruit = { _id: -1, name: "", best: false }, handleSubmit }) => {

  const [best, setBest] = useState<boolean>(fruit.best)
  const name = useField(fruit.name, "Add a fruit:", "name", "text")

  const setter = (set: any) =>
    (event: any) => {
      const { checked, type, value } = event.target
      const newValue = type === "checkbox" ? checked : value
      set(newValue)
    }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (name.value.length > 0) {
      const updateFruit: IFruit = fruit
      updateFruit.best = best
      updateFruit.name = name.value
      handleSubmit(updateFruit)
      setBest(false)
      name.reset()
    } else {
      alert("You need to add a name")
    }
  }

  return (
    <form className="fruit-form" onSubmit={(event) => submit(event)}>
      <h2>List out your favourite fruit</h2>
      <InputText {...name} />
      <InputCheckbox
        checked={best}
        handleChange={setter(setBest)}
        label="Is it best?:"
        name="name"
        value={best.toString()} />
      <button>Add new fruit</button>
    </form>
  )
}

export default Form
