
import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import { InputText, InputCheckbox } from './Input'

describe('the InputText component', () => {
  const mockFunction = jest.fn()
  const label = "This is a label"
  const name = "This is a name"
  const value = "This is a value"
  const component = <InputText
    handleChange={mockFunction()}
    label={label}
    name={name}
    value={value} />
  const wrapper = mount(component)

  it('renders with the correct structure', () => {
    expect(wrapper).toBeDefined()
    expect(wrapper.find('div')).toHaveLength(1)
    expect(wrapper.find('label')).toHaveLength(1)
    expect(wrapper.find('label').text()).toEqual(label)
    expect(wrapper.find('label').props().htmlFor).toEqual(name)
    expect(wrapper.find('input')).toHaveLength(1)
    expect(wrapper.find('input').props().name).toEqual(name)
    expect(wrapper.find('input').props().value).toEqual(value)
    expect(wrapper.find('input').props().type).toEqual("text")
  })

  it('functions as expected', () => {
    expect(wrapper.props().name).toEqual(name)
    expect(wrapper.props().label).toEqual(label)
    expect(wrapper.props().value).toEqual(value)
    wrapper.simulate('change')
    expect(mockFunction).toHaveBeenCalled()
  })

  it('renders the same as last time', () => {
    const tree = renderer
      .create(component)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})



describe('the InputCheckbox component', () => {
  const mockFunction = jest.fn()
  const checked = false
  const label = "This is a label"
  const name = "This is a name"
  const component = <InputCheckbox
    checked={checked}
    handleChange={mockFunction()}
    label={label}
    name={name} />
  const wrapper = mount(component)

  it('renders with the correct structure', () => {
    expect(wrapper).toBeDefined()
    expect(wrapper.find('div')).toHaveLength(2)
    expect(wrapper.find('label')).toHaveLength(2)
    expect(wrapper.find('label').at(0).text()).toEqual(label)
    expect(wrapper.find('label').at(0).props().htmlFor).toEqual(name)
    expect(wrapper.find('input')).toHaveLength(1)
    expect(wrapper.find('input').props().checked).toEqual(checked)
    expect(wrapper.find('input').props().name).toEqual(name)
    expect(wrapper.find('input').props().type).toEqual("checkbox")
  })

  it('functions as expected', () => {
    expect(wrapper.props().label).toEqual(label)
    expect(wrapper.props().name).toEqual(name)
    expect(wrapper.props().checked).toEqual(checked)
    wrapper.simulate('change')
    expect(mockFunction).toHaveBeenCalled()
  })

  it('renders the same as last time', () => {
    const tree = renderer
      .create(component)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
