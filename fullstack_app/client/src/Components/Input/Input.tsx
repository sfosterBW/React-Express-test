import React, { FC } from 'react'
import styles from './Input.module.css'

interface InputTextProps {
  handleChange: (event: any) => void
  label: string
  name: string
  value: string
}

export const InputText: FC<InputTextProps> = ({
  handleChange,
  label,
  name,
  value
}) => {
  return (
    <div className={styles.wrapper} data-testid="wrapper">
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={styles.text}
        data-testid="input-text"
        id={name}
        onChange={handleChange}
        name={name}
        type="text"
        value={value}
      />
    </div>
  )
}

interface InputCheckboxProps {
  checked: boolean
  handleChange: (event: any) => void
  label: string
  name: string
}

export const InputCheckbox: FC<InputCheckboxProps> = ({
  checked,
  handleChange,
  label,
  name
}) => {
  const styleBackground = (): string | undefined => {
    const color: string = '#1ab545'
    return checked ? color : undefined
  }

  return (
    <div className={styles.wrapper} data-testid="wrapper">
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <div className={styles.checkboxWrapper}>
        <input
          checked={checked}
          className={styles.checkbox}
          data-testid="input"
          id={name}
          onChange={handleChange}
          name={name}
          type="checkbox"
          value={String(checked)}
        />
        <label
          style={{background: styleBackground()}}
          className={styles.checkboxLabel}
          data-testid="toggle"
          htmlFor={name}
        >
          <span className={styles.checkboxButton} />
        </label>
      </div>
    </div>
  )
}
