import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import App from './App'

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch
}))

describe('the app component', () => {
  jest.mock('./../../utils/api')
  const component =  <App />
  const wrapper = mount(component)

  it('renders with the correct structure', () => {
    expect(wrapper).toBeDefined()
    expect(wrapper.find('div.App')).toHaveLength(1)
    expect(wrapper.find('main')).toHaveLength(1)
    expect(wrapper.find('Nav')).toHaveLength(1)
    expect(wrapper.find('Router')).toHaveLength(1)
    expect(wrapper.find('Home')).toHaveLength(1)
    expect(wrapper.find('AddFruit')).toHaveLength(0)
    expect(wrapper.find('EditFruit')).toHaveLength(0)
    expect(wrapper.find('Modal')).toHaveLength(1)
  })

  it('navigates through pages', () => {
    wrapper.find('nav a').at(2).simulate('click')
    expect(wrapper).toBeDefined()
  })

  it('renders the same as last time', () => {
    const tree = renderer
      .create(component)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
