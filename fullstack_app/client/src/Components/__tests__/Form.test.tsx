import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import Form from '../Form'

describe('the Form component', () => {

  describe('without props', () => {

    const mockFunction = jest.fn()
    const formComponent = <Form handleSubmit={mockFunction()} />
    const form = mount(formComponent)

    it('renders with the correct structure', () => {
      expect(form).toBeDefined()
      expect(form.find('form')).toHaveLength(1)
      expect(form.find('h2')).toHaveLength(1)
      expect(form.find('InputText')).toHaveLength(1)
      expect(form.find('InputCheckbox')).toHaveLength(1)
      expect(form.find('button')).toHaveLength(1)
    })

    it('renders the same as last time', () => {
      const tree = renderer
        .create(formComponent)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })

  })

  describe('with props', () => {

    const testFruit = { _id: 2, name: "Banana", best: true }
    const mockFunction = jest.fn()
    const formComponent = <Form
      fruit={testFruit}
      handleSubmit={mockFunction()} />
    const form = mount(formComponent)

    it('functions properly with props', () => {
      expect(form).toBeDefined()
      expect(form.find('InputText').props().value).toEqual(testFruit.name)
      expect(form.find('InputCheckbox').props().checked).toEqual(testFruit.best)
      form.find('button').simulate('click')
      expect(mockFunction).toHaveBeenCalled()
    })

    it('renders the same as last time', () => {
      const tree = renderer
        .create(formComponent)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
