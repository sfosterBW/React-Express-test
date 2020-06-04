import React, { FC, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import fruitService from '../../utils/api'
import { InputCheckbox, InputText } from '../Input/Input'
import { useField } from '../../utils/hooks'
import { IFruit } from '../../utils/interfaces'
import { RootState } from '../../utils/store'
import { createFruit, toggleAlert, toggleModal, updateFruit } from '../../utils/actions'
import styles from './Form.module.css'

interface Props {
  fruit?: IFruit
  title?: string
}

const defaultFruit = { id: undefined, name: "", best: false }

const Form: FC<Props> = ({ fruit = defaultFruit, title = "Add a new fruit" }) => {
  const [best, setBest] = useState<boolean>(fruit.best)
  const name = useField(fruit.name, "Add a fruit", "name", "text")
  const selectModal = (state: RootState) => state.modal.toggle
  const modal = useSelector(selectModal)
  const dispatch = useDispatch()

  const setter = (set: any) =>
    (event: any) => {
      const { checked, type, value } = event.target
      const newValue = type === "checkbox" ? checked : value
      set(newValue)
    }

  const handleSubmit = async (fruit: IFruit) => {
    if (fruit.id) {
      const res = await fruitService.updateFruit(fruit)
      if(res.status === 201) {
        dispatch(updateFruit(res.data))
      } else {
        dispatch(toggleAlert(true))
      }
    } else {
      const res = await fruitService.createFruit(fruit)
      if(res.status === 201) {
        dispatch(createFruit(res.data))
      } else {
        dispatch(toggleAlert(true))
      }
    }
    modal && dispatch(toggleModal(false))
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
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
      dispatch(toggleAlert(true))
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

export default Form
