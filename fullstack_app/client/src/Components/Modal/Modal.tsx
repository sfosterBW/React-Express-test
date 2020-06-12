import React, { FC } from 'react'
import { RootState } from '../../Reducers/store'
import { useSelector, useDispatch } from 'react-redux'
import { toggleModal } from '../../Reducers/modalReducer'
import { Fruit } from '../../utils/interfaces'
import EditForm from '../Form/EditForm'
import NewForm from '../Form/NewForm'
import styles from './Modal.module.css'

const Modal: FC<{fruit: Fruit | undefined}> = ({ fruit }) => {
  const selectToggle = (state: RootState) => state.modal.toggle
  const toggle = useSelector(selectToggle)
  const dispatch = useDispatch()

  if(!toggle || !fruit) {
    return null
  }

  return (
    <div>
      <section className={styles.wrapper}>
        <div className={styles.modal}>
          {!fruit && <NewForm />}
          {fruit && <EditForm fruit={fruit} title="Edit fruit" />}
          <button
            className={styles.close}
            data-testid="close"
            name="close"
            onClick={() => dispatch(toggleModal(!toggle))}
          >
            &times;
          </button>
        </div>
      </section>
    </div>
  )
}

export default Modal
