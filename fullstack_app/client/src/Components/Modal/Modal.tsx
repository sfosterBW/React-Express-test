import React, { FC } from 'react'
import { RootState } from '../../utils/store'
import { useSelector, useDispatch } from 'react-redux'
import { toggleModal } from '../../utils/actions'
import { IFruit } from '../../utils/interfaces'
import Form from '../Form/Form'
import styles from './Modal.module.css'

const Modal: FC<{fruit: IFruit | undefined}> = ({ fruit }) => {
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
          <Form fruit={fruit} title="Edit fruit" />
          <button
            className={styles.close}
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
