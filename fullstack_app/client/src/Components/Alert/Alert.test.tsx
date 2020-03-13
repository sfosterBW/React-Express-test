import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import Alert from './Alert'

const value = true
const mockDispatch = jest.fn().mockReturnValue(!value)
jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockReturnValue(true),
  useDispatch: () => mockDispatch
}))

describe('the Alert component', () => {

  const component = <Alert />
  const wrapper = mount(component)

  it('renders with the right structure', () => {
    expect(wrapper).toBeDefined()
    expect(wrapper.find('div')).toHaveLength(1)
    expect(wrapper.find('section')).toHaveLength(1)
    expect(wrapper.find('p')).toHaveLength(1)
    expect(wrapper.find('p').text()).toBe(String(value))
    expect(wrapper.find('button')).toHaveLength(1)
  })

  it('renders on mount functions as expected', () => {
    wrapper.find('button').simulate('click')
    expect(mockDispatch).toHaveBeenCalledTimes(1)
  })

  it('renders the same as last time with props', () => {
    const tree = renderer
      .create(component)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
