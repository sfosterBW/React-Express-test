import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import Form from './Form'

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch
}))

describe('the Form component', () => {

  describe('with default props', () => {

    const component = <Form  />
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

  describe('with custom props', () => {

    const testFruit = { _id: 2, name: "Banana", best: true }
    const formComponent = <Form fruit={testFruit} />
    const form = mount(formComponent)

    it('functions properly with props', () => {
      expect(form).toBeDefined()
      expect(form.find('InputText').props().value).toEqual(testFruit.name)
      expect(form.find('InputCheckbox').props().checked).toEqual(testFruit.best)
      form.find('button').simulate('click')
    })

    it('renders the same as last time', () => {
      const tree = renderer
        .create(formComponent)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
