import { useState } from 'react'

interface Field<T> {
  label: string
  name: string
  onChange: (event: any) => void
  type: string
  value: T
}

const useField = <T>(
  label: string,
  name: string,
  type: string,
  initValue: T
): [Field<T>, () => void] => {

  const [value, setValue] = useState(initValue)

  const onChange = (event: any): void => {
    if (type === "checkbox") {
      setValue(event.target.checked)
    } else {
      setValue(event.target.value)
    }
  }

  const reset = (resetValue: T = initValue): void => {
    setValue(resetValue)
  }

  return [{
    onChange,
    label,
    name,
    type,
    value
  }, reset]
}

export default useField
