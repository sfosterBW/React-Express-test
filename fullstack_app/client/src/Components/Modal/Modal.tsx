import React, { FC } from 'react'
import { RootState } from '../../utils/store'
import { useSelector, useDispatch } from 'react-redux'
import { toggleModal } from '../../utils/actions'
import { IFruit } from '../../utils/interfaces'
import Form from '../Form/Form'
import styles from './Modal.module.css'

interface Props {
  fruit: IFruit | undefined
  title: string
}

const Modal: FC<Props> = ({ fruit, title }) => {

  const selectToggle = (state: RootState) => state.modal.toggle
  const toggle = useSelector(selectToggle)
  const dispatch = useDispatch()

  const displayModal = () => {
    if (toggle && fruit) {
      return (
        <section className={styles.wrapper}>
          <div className={styles.modal}>
            <h2 className={styles.title}>{title}</h2>
            <Form fruit={fruit} />
            <button
              className={styles.close}
              name="close"
              onClick={() => dispatch(toggleModal(!toggle))}>
              &times;
              </button>
          </div>
        </section>
      )
    }
  }

  return (
    <div>{displayModal()}</div>
  )
}

export default Modal
