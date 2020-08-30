import React, { FC, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputCheckbox, InputText } from '../Input/Input'
import useField from '../../utils/hooks'
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
  const dispatch = useDispatch()

  const modal = useSelector((state: RootState) => state.modal.toggle)

  const [best, resetBest] = useField<boolean>("Is it best?", "best", "checkbox", fruit.best)
  const [description, resetDescription] = useField<string>("Description", "description", "text", "")
  const [name, resetName] = useField<string>("Add a fruit", "name", "text", fruit.name)
  
  const submit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    dispatch(updateFruit({
      id: fruit.id,
      best: best.value,
      name: name.value,
      description: description.value === "" ? undefined : description.value
    }))
    dispatch(toggleAlert(`${name.value} has been updated`, true))

    if (modal) {
      dispatch(toggleModal(false))
    }

    resetBest()
    resetDescription()
    resetName()
  }

  return (
    <form className={styles.form} onSubmit={(event) => submit(event)}>
      <h2 className={styles.title}>
        {title}
      </h2>
      <InputText {...name} />
      <InputText {...description} />
      <InputCheckbox {...best} />
      <button className={styles.button} data-testid="submit-edit">
        Edit fruit
      </button>
    </form>
  )
}

export default EditForm
