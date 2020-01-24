import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import Alert from '../Alert'

describe('the Alert component', () => {

  const message = "Test message"
  const mockFunction = jest.fn()
  const alertComponent = <Alert message={message} onClose={mockFunction()} />
  const alert = mount(alertComponent)

  it('renders with the right structure', () => {
    expect(alert).toBeDefined()
    expect(alert.find('div')).toHaveLength(1)
    expect(alert.find('p')).toHaveLength(1)
    expect(alert.find('p').text()).toBe(message)
    expect(alert.find('button')).toHaveLength(1)
  })

  it('renders on mount functions as expected', () => {
    alert.find('button').simulate('click')
    expect(mockFunction).toHaveBeenCalled()
  })

  it('renders the same as last time with props', () => {
    const tree = renderer
      .create(alertComponent)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
