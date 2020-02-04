import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import Alert from '../Alert'
import { rootReducer } from '../../utils/store'

describe('the Alert component', () => {

  const alertValue = true
  const mockStore = createStore(rootReducer, { alert: { toggle: alertValue } })
  const alertComponent =
    <Provider store={mockStore}>
      <Alert />
    </Provider>
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
    expect(alert.find('div')).toHaveLength(1)
  })

  it('renders the same as last time with props', () => {
    const tree = renderer
      .create(alertComponent)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
