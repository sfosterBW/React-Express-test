import React, { FC, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputCheckbox, InputText } from '../Input/Input'
import useField from '../../utils/hooks'
import { RootState } from '../../Reducers/store'
import { toggleAlert } from '../../Reducers/alertReducer'
import { createFruit } from '../../Reducers/fruitReducer'
import { toggleModal } from '../../Reducers/modalReducer'
import styles from './Form.module.css'

const NewForm: FC<{ title?: string }> = ({ title = 'Add a new fruit' }) => {
  const dispatch = useDispatch()

  const modal = useSelector((state: RootState) => state.modal.toggle)

  const [best, resetBest] = useField<boolean>('Is it best?', 'best', 'checkbox', false)
  const [description, resetDescription] = useField<string>('Description', 'description', 'text', '')
  const [name, resetName] = useField<string>('Add a fruit', 'name', 'text', '')

  const submit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    dispatch(createFruit({
      name: name.value,
      description: description.value === '' ? undefined : description.value,
      best: best.value
    }))
    dispatch(toggleAlert(`${name.value} has been added`, true))

    if (modal) {
      dispatch(toggleModal(false))
    }

    resetName()
    resetDescription()
    resetBest()
  }

  return (
    <form className={styles.form} onSubmit={(event): void => submit(event)}>
      <h2 className={styles.title} data-testid="new-form-title">
        {title}
      </h2>
      <InputText {...name} />
      <InputText {...description} />
      <InputCheckbox {...best} />
      <button className={styles.button} data-testid="new-form-submit">
        Add new fruit
      </button>
    </form>
  )
}

export default NewForm
