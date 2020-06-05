import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import EditForm from './EditForm'

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch
}))

describe('the Edit Form component', () => {
  const testFruit = { id: "2", name: "Banana", best: true }
  const formComponent = <EditForm fruit={testFruit} />
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
