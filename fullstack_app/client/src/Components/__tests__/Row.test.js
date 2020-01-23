
import React from 'react'
import { mount, render, shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import Row from '../Row'

describe('the Row component', () => {
  it('shallow renders', () => {
    const row = mount(<Row fruit={{_id: 1, name:"apple", best:false}} />)
    expect(row).toBeDefined()
  })

  it('renders the same as last time', () => {
    const tree = renderer
      .create(<Row fruit={{_id: 1, name:"apple", best:false}} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
