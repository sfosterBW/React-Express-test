import React, { FC, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputCheckbox, InputText } from '../Input/Input'
import { useField } from '../../utils/hooks'
import { RootState } from '../../Reducers/store'
import { toggleAlert } from '../../Reducers/alertReducer'
import { createFruit } from '../../Reducers/fruitReducer'
import { toggleModal } from '../../Reducers/modalReducer'
import styles from './Form.module.css'

const NewForm: FC<{ title?: string }> = ({ title = "Add a new fruit" }) => {
  const [best, setBest] = useState<boolean>(false)
  const name = useField("Add a fruit", "name", "text", "")
  const description = useField("Description", "description", "text", undefined)
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
    dispatch(createFruit({
      name: name.value,
      description: description.value,
      best
    }))
    dispatch(toggleAlert(`${name.value} has been added`, true))

    if (modal) {
      dispatch(toggleModal(false))
    }

    name.reset()
    description.reset()
    setBest(false)
  }

  return (
    <form className={styles.form} onSubmit={(event) => submit(event)}>
      <h2 className={styles.title}>{title}</h2>
      <InputText {...name} />
      <InputText {...description} />
      <InputCheckbox
        checked={best}
        handleChange={setter(setBest)}
        label="Is it best?"
        name="best" />
      <button className={styles.button} data-testid="submit-new">
        Add new fruit
      </button>
    </form>
  )
}

export default NewForm
