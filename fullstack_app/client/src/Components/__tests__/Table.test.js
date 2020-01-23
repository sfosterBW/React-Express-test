
import React from 'react'
import { mount, render, shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import Table from '../Table'

describe('the Table component', () => {
  it('shallow renders', () => {
    const table = mount(<Table />)
    expect(table).toBeDefined()
  })


  it('renders the same as last time', () => {
    const tree = renderer
      .create(<Table />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
