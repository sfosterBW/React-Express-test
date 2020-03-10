
import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { IFruit } from '../../utils/interfaces'

import Table from './Table'

describe('the Table component', () => {

  const fruits: IFruit[] = []
  const component = <Table fruits={fruits} />
  const wrapper = mount(component)

  it('renders with the right structure', () => {
    expect(wrapper).toBeDefined()
    expect(wrapper.find('section')).toHaveLength(1)
    expect(wrapper.find('div')).toHaveLength(2)
    expect(wrapper.find('button')).toHaveLength(3)
  })

  it('renders the same as last time', () => {
    const tree = renderer
      .create(component)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
