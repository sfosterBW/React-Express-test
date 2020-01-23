import React, { FC } from 'react'

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
  value }) => {

  return (
    <div className="input-wrapper">
      <label htmlFor={name}>{label}</label>
      <input
        onChange={() => handleChange}
        name={name}
        type="text"
        value={value} />
    </div>
  )
}

interface InputCheckboxProps {
  checked: boolean
  handleChange: (event: any) => void
  label: string
  name: string
  value: string
}

export const InputCheckbox: FC<InputCheckboxProps> = ({
  checked,
  handleChange,
  label,
  name,
  value }) => {

  return (
    <div className="input-wrapper">
      <label htmlFor={name}>{label}</label>
      <input
        checked={checked}
        onChange={() => handleChange}
        name={name}
        type="checkbox"
        value={value} />
    </div>
  )
}
