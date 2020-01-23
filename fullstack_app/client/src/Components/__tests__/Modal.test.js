
import React from 'react'
import { mount, render, shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import Modal from '../Modal'

describe('the Modal component', () => {
  it('shallow renders', () => {
    const modal = mount(<Modal />)
    expect(modal).toBeDefined()
  })

  it('renders the same as last time', () => {
    const tree = renderer
      .create(<Modal />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
