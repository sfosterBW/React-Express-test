import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import NewForm from './NewForm'

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch
}))

describe('the Form component', () => {
  const component = <NewForm  />
  const wrapper = mount(component)

  it('renders with the correct structure', () => {
    expect(wrapper).toBeDefined()
    expect(wrapper.find('form')).toHaveLength(1)
    expect(wrapper.find('h2')).toHaveLength(1)
    expect(wrapper.find('InputText')).toHaveLength(1)
    expect(wrapper.find('InputCheckbox')).toHaveLength(1)
    expect(wrapper.find('button')).toHaveLength(1)
  })

  it('functions properly with props', () => {
    expect(wrapper).toBeDefined()
    expect(wrapper.find('InputText').props().value).toEqual("")
    expect(wrapper.find('InputCheckbox').props().checked).toEqual(false)
    wrapper.find('button').simulate('click')
  })

  it('renders the same as last time', () => {
    const tree = renderer
      .create(component)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
