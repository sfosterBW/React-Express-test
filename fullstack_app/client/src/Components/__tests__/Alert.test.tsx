import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import Alert from '../Alert'

const alertValue = true
const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockReturnValue(true),
  useDispatch: () => mockDispatch
}))

describe('the Alert component', () => {

  const alertComponent = <Alert />
  const alert = mount(alertComponent)

  it('renders with the right structure', () => {
    expect(alert).toBeDefined()
    expect(alert.find('div')).toHaveLength(2)
    expect(alert.find('p')).toHaveLength(1)
    expect(alert.find('p').text()).toBe(String(alertValue))
    expect(alert.find('button')).toHaveLength(1)
  })

  it('renders on mount functions as expected', () => {
    alert.find('button').simulate('click')
  })

  it('renders the same as last time with props', () => {
    const tree = renderer
      .create(alertComponent)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
