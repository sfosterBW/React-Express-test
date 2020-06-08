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

  const submit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const newFruit: NewFruit = { name: name.value, best }

    try{
      const fruit = await fruitService.createFruit(newFruit)
      dispatch(createFruit(fruit))
    }
    catch (error) {
      console.log(error.response.data)
      dispatch(toggleAlert(error.response.data, true))
    }
    
    modal && dispatch(toggleModal(false))
    name.reset()
    setBest(false)
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
