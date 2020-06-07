import React, { FC, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import fruitService from '../../utils/api'
import { InputCheckbox, InputText } from '../Input/Input'
import { useField } from '../../utils/hooks'
import { Fruit } from '../../utils/interfaces'
import { RootState } from '../../utils/store'
import { toggleAlert, toggleModal, updateFruit } from '../../utils/actions'
import styles from './Form.module.css'

interface Props {
  fruit: Fruit
  title?: string
}

const EditForm: FC<Props> = ({ fruit, title = "Edit a fruit" }) => {
  const [best, setBest] = useState<boolean>(fruit.best)
  const name = useField(fruit.name, "Add a fruit", "name", "text")
  const toggle = (state: RootState) => state.modal.toggle
  const modal = useSelector(toggle)
  const dispatch = useDispatch()

  const setter = (set: any) => (
    (event: any): void => {
      const { checked, type, value } = event.target
      const newValue = type === "checkbox" ? checked : value
      set(newValue)
    }
  )

  const handleSubmit = async (fruit: Fruit): Promise<void> => {
    try {
      const updatedFruit = await fruitService.updateFruit(fruit)
      dispatch(updateFruit(updatedFruit))
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
      handleSubmit({
        id: fruit.id,
        best: best,
        name: name.value,
      })
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
      <button className={styles.button}>Edit fruit</button>
    </form>
  )
}

export default EditForm
