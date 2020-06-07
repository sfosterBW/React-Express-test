import React, { FC, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import fruitService from '../../utils/api'
import { InputCheckbox, InputText } from '../Input/Input'
import { useField } from '../../utils/hooks'
import { NewFruit } from '../../utils/interfaces'
import { RootState } from '../../utils/store'
import { createFruit, toggleAlert, toggleModal } from '../../utils/actions'
import styles from './Form.module.css'

const NewForm: FC<{title?: string}> = ({ title = "Add a new fruit" }) => {
  const [best, setBest] = useState<boolean>(false)
  const name = useField("", "Add a fruit", "name", "text")
  const toggle = (state: RootState) => state.modal.toggle
  const modal = useSelector(toggle)
  const dispatch = useDispatch()

  const setter = (set: any) => (
    (event: any) => {
      const { checked, type, value } = event.target
      const newValue = type === "checkbox" ? checked : value
      set(newValue)
    }
  )

  const handleSubmit = async (fruit: NewFruit): Promise<void> => {
    try{
      const newFruit = await fruitService.createFruit(fruit)
      dispatch(createFruit(newFruit))
    }
    catch (error) {
      console.log(error)
      dispatch(toggleAlert('submit error', true))
    }
    modal && dispatch(toggleModal(false))
  }

  const submit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (name.value.length > 0) {
      const newFruit: NewFruit = { name: name.value, best }
      handleSubmit(newFruit)
      name.reset()
      setBest(false)
    } else {
      dispatch(toggleAlert('submit error', true))
    }
  }

  return (
    <form className={styles.form} onSubmit={(event) => submit(event)}>
      <h2 className={styles.title}>{title}</h2>
      <InputText {...name} />
      <InputCheckbox
        checked={best}
        handleChange={setter(setBest)}
        label="Is it best?"
        name="best" />
      <button className={styles.button}>Add new fruit</button>
    </form>
  )
}

export default NewForm
