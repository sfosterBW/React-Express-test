import React, { FC, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import fruitService from '../utils/api'
import { InputCheckbox, InputText } from './Input'
import { useField } from '../utils/hooks'
import { IFruit } from '../utils/interfaces'
import { createFruit, toggleModal, updateFruit } from '../utils/actions'

interface Props {
  fruit?: IFruit
}

const defaultFruit = { _id: undefined, name: "", best: false }

const Form: FC<Props> = ({ fruit = defaultFruit }) => {

  const [best, setBest] = useState<boolean>(fruit.best)
  const name = useField(fruit.name, "Add a fruit:", "name", "text")
  const dispatch = useDispatch()

  const setter = (set: any) =>
    (event: any) => {
      const { checked, type, value } = event.target
      const newValue = type === "checkbox" ? checked : value
      set(newValue)
    }

  const handleSubmit = (fruit: IFruit) => {
    if (fruit._id) {
      fruitService.updateFruit(fruit).then(res => dispatch(updateFruit(res)))
    } else {
      fruitService.createFruit(fruit).then(res => dispatch(createFruit(res)))
    }
    dispatch(toggleModal(false))
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
        name="best" />
      <button>Add new fruit</button>
    </form>
  )
}

export default Form
