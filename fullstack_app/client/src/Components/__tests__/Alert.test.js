import React from 'react'
import {
  mount
} from 'enzyme'
import renderer from 'react-test-renderer'

import Alert from '../Alert'

describe('the Alert component', () => {

  describe('without props', () => {

    const alertComponent = < Alert / >

      it('renders on mount and has the right structure', () => {
        const alert = mount(alertComponent)
        expect(alert).toBeDefined()
        expect(alert.find('div')).toHaveLength(1)
        expect(alert.find('p')).toHaveLength(1)
        expect(alert.find('button')).toHaveLength(1)
      })

    it('renders the same as last time without props', () => {
      const tree = renderer
        .create(alertComponent)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('with props', () => {

    const message = "Test message"
    const mockFunction = jest.fn()
    const alertComponent = < Alert
    message = {
      message
    }
    onClose = {
      mockFunction()
    }
    />

    it('renders on mount functions as expected', () => {
      const alert = mount(alertComponent)
      expect(alert).toBeDefined()
      expect(alert.find('p').text()).toBe(message)
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
})
