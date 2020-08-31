import { ChangeEvent, useState } from 'react'

/* eslint-disable  @typescript-eslint/no-explicit-any */

interface Field<T> {
  label: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  value: T;
}

const useField = <T>(
  label: string,
  name: string,
  type: string,
  initValue: T
): [Field<T>, () => void] => {

  const [value, setValue] = useState(initValue)

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (type === 'checkbox' && typeof value === 'boolean') {
      setValue(event.target.checked as any)
    } else {
      setValue(event.target.value as any)
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
