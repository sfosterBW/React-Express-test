import React, { FC } from 'react'
import styles from './Input.module.css'

interface InputTextProps {
  label: string
  name: string
  onChange: (event: any) => void
  value: string
}

export const InputText: FC<InputTextProps> = ({
  onChange,
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
        onChange={onChange}
        name={name}
        type="text"
        value={value}
      />
    </div>
  )
}

interface InputCheckboxProps {
  label: string
  name: string
  onChange: (event: any) => void
  value: boolean
}

export const InputCheckbox: FC<InputCheckboxProps> = ({
  onChange,
  label,
  name,
  value
}) => {
  const styleBackground = (): string | undefined => {
    const color: string = '#1ab545'
    return value ? color : undefined
  }

  return (
    <div className={styles.wrapper} data-testid="wrapper">
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <div className={styles.checkboxWrapper}>
        <input
          checked={value}
          className={styles.checkbox}
          data-testid="input"
          id={name}
          onChange={onChange}
          name={name}
          type="checkbox"
          value={String(value)}
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
