
import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { IFruit } from '../../utils/interfaces'

import Table from '../Table'

describe('the Table component', () => {

  const fruits: IFruit[] = []
  const title = "This is a title"
  const type = false
  const tableComponent = <Table fruits={fruits} title={title} type={type} />
  const table = mount(tableComponent)

  it('renders with the right structure', () => {
    expect(table).toBeDefined()
    expect(table.find('div')).toHaveLength(1)
    expect(table.find('h2')).toHaveLength(1)
    expect(table.find('h2').text()).toEqual(title)
    expect(table.find('table')).toHaveLength(1)
    expect(table.find('thead')).toHaveLength(1)
    expect(table.find('tr')).toHaveLength(1)
    expect(table.find('th')).toHaveLength(6)
    expect(table.find('tbody')).toHaveLength(1)
  })

  it('renders the same as last time', () => {
    const tree = renderer
      .create(tableComponent)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
