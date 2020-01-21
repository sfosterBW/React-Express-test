import { useState } from 'react'

export const useField = (
  initValue: string, type: string, label: string, name: string ) => {

  const [value, setValue] = useState(initValue)

  const handleChange = (event: any) => {
    setValue(event.target.value)
  }

  return {
    label,
    name,
    type,
    value,
    handleChange
  }
}
