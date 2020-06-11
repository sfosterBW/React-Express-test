import React, { FC, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputCheckbox, InputText } from '../Input/Input'
import { useField } from '../../utils/hooks'
import { Fruit } from '../../utils/interfaces'
import { RootState } from '../../Reducers/store'
import { toggleAlert } from '../../Reducers/alertReducer'
import { updateFruit } from '../../Reducers/fruitReducer'
import { toggleModal } from '../../Reducers/modalReducer'
import styles from './Form.module.css'

interface Props {
  fruit: Fruit
  title?: string
}

const EditForm: FC<Props> = ({ fruit, title = "Edit a fruit" }) => {
  const [best, setBest] = useState<boolean>(fruit.best)
  const name = useField("Add a fruit", "name", "text", fruit.name)
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

  const submit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    dispatch(updateFruit({
      id: fruit.id,
      best: best,
      name: name.value,
    }))
    dispatch(toggleAlert(`${name.value} has been updated`, true))

    if (modal) {
      dispatch(toggleModal(false))
    }
    
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
      <button className={styles.button}>Edit fruit</button>
    </form>
  )
}

export default EditForm
