import { useState } from 'react'

export const useField = (
  label: string,
  name: string,
  type: string,
  initValue: string = ""
) => {

  const [value, setValue] = useState(initValue)

  const handleChange = (event: any): void => {
    if (type === "checkbox") {
      setValue(event.target.checked)
    } else {
      setValue(event.target.value)
    }
  }

  const reset = (resetValue = ""): void => {
    setValue(resetValue)
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
