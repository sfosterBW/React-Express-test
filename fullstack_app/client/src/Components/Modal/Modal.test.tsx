
import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import Modal from './Modal'

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockReturnValue(true),
  useDispatch: () => mockDispatch
}))

const mockFruit = {
  _id: 1,
  name: "False Case",
  best: false
}
const component = <Modal fruit={mockFruit} />
const wrapper = mount(component)

describe('the modal component', () => {

  it('renders with the correct structure', () => {
    expect(wrapper).toBeDefined()
    expect(wrapper.find('section')).toHaveLength(1)
    expect(wrapper.find('div')).toHaveLength(5)
    expect(wrapper.find('h2')).toHaveLength(1)
    expect(wrapper.find('form')).toHaveLength(1)
    expect(wrapper.find({name: 'close'})).toHaveLength(1)
  })

  it('functions as expected', () => {
    wrapper.find({name: 'close'}).simulate('click')
  })

  it('renders the same as last time', () => {
    const tree = renderer
      .create(component)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

})
