import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { InputText, InputCheckbox } from './Input'

describe('the InputText component', () => {
  const label = "This is a label"
  const name = "This is a name"
  const value = "This is a value"
  const handleChange = jest.fn()
  const component = <InputText
    handleChange={handleChange}
    label={label}
    name={name}
    value={value} />

  it('renders with the correct structure', () => {
    const { getByLabelText, getByTestId } = render(component)
    expect(getByTestId("wrapper")).toBeInTheDocument()
    expect(getByLabelText(label)).toBeInTheDocument()
  })

  it('functions as expected', () => {
    const { getByTestId } = render(component)
    const testValue = "test"
    fireEvent.change(getByTestId('input-text'), {
      target: { value: testValue }
    })

    expect(handleChange.mock.calls).toHaveLength(1)
  })

  it('renders the same as last time', () => {
    const { container } = render(component)
    expect(container).toMatchSnapshot()
  })
})

describe('the InputCheckbox component', () => {
  const handleChange = jest.fn()
  const checked = false
  const label = "This is a label"
  const name = "This is a name"
  const component = <InputCheckbox
    checked={checked}
    handleChange={handleChange}
    label={label}
    name={name} />

  it('renders with the correct structure', () => {
    const { getByLabelText, getByTestId } = render(component)
    expect(getByTestId("wrapper")).toBeInTheDocument()
    expect(getByLabelText(label)).toBeInTheDocument()
  })

  it('functions as expected', () => {
    const { getByTestId } = render(component)
    fireEvent.click(getByTestId('toggle'))

    expect(handleChange.mock.calls).toHaveLength(1)
  })

  it('renders the same as last time', () => {
    const { container } = render(component)
    expect(container).toMatchSnapshot()
  })
})
