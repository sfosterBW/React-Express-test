
import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import { InputText, InputCheckbox } from '../Input'

describe('the InputText component', () => {
  const mockFunction = jest.fn()
  const label = "This is a label"
  const name = "This is a name"
  const value = "This is a value"
  const inputTextComponent = <InputText
    handleChange={mockFunction()}
    label={label}
    name={name}
    value={value} />
  const inputText = mount(inputTextComponent)

  it('renders with the correct structure', () => {
    expect(inputText).toBeDefined()
    expect(inputText.find('div')).toHaveLength(1)
    expect(inputText.find('label')).toHaveLength(1)
    expect(inputText.find('label').text()).toEqual(label)
    expect(inputText.find('label').props().htmlFor).toEqual(name)
    expect(inputText.find('input')).toHaveLength(1)
    expect(inputText.find('input').props().name).toEqual(name)
    expect(inputText.find('input').props().value).toEqual(value)
    expect(inputText.find('input').props().type).toEqual("text")
  })

  it('functions as expected', () => {
    expect(inputText.props().name).toEqual(name)
    expect(inputText.props().label).toEqual(label)
    expect(inputText.props().value).toEqual(value)
    inputText.simulate('change')
    expect(mockFunction).toHaveBeenCalled()
  })

  it('renders the same as last time', () => {
    const tree = renderer
      .create(inputTextComponent)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})



describe('the InputCheckbox component', () => {
  const mockFunction = jest.fn()
  const checked = false
  const label = "This is a label"
  const name = "This is a name"
  const inputCheckboxComponent = <InputCheckbox
    checked={checked}
    handleChange={mockFunction()}
    label={label}
    name={name} />
  const inputCheckbox = mount(inputCheckboxComponent)

  it('renders with the correct structure', () => {
    expect(inputCheckbox).toBeDefined()
    expect(inputCheckbox.find('div')).toHaveLength(1)
    expect(inputCheckbox.find('label')).toHaveLength(1)
    expect(inputCheckbox.find('label').text()).toEqual(label)
    expect(inputCheckbox.find('label').props().htmlFor).toEqual(name)
    expect(inputCheckbox.find('input')).toHaveLength(1)
    expect(inputCheckbox.find('input').props().checked).toEqual(checked)
    expect(inputCheckbox.find('input').props().name).toEqual(name)
    expect(inputCheckbox.find('input').props().type).toEqual("checkbox")
  })

  it('functions as expected', () => {
    expect(inputCheckbox.props().label).toEqual(label)
    expect(inputCheckbox.props().name).toEqual(name)
    expect(inputCheckbox.props().checked).toEqual(checked)
    inputCheckbox.simulate('change')
    expect(mockFunction).toHaveBeenCalled()
  })

  it('renders the same as last time', () => {
    const tree = renderer
      .create(inputCheckboxComponent)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
