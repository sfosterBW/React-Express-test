import { useState } from 'react'

export const useField = (
  initValue: string,
  label: string,
  name: string,
  type: string) => {

  const [value, setValue] = useState(initValue)

  const handleChange = (event: any) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue("")
  }

  return {
    handleChange,
    label,
    name,
    reset,
    type,
    value
  }
}
