import React, { ChangeEvent, FC } from 'react'
import styles from './Input.module.css'

interface InputTextProps {
  label: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
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
  label: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: boolean;
}

export const InputCheckbox: FC<InputCheckboxProps> = ({
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
          style={{ background: value ? '#1ab545' : undefined }}
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
