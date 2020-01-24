
import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import Table from '../Table'

describe('the Table component', () => {

  const rows = <tbody>
    <tr>
      <td>This is text</td>
    </tr>
    <tr>
      <td>This is text</td>
    </tr>
  </tbody>
  const title = "This is a title"
  const tableComponent = <Table rows={rows} title={title} />
  const table = mount(tableComponent)

  it('renders with the right structure', () => {
    expect(table).toBeDefined()
    expect(table.find('div')).toHaveLength(1)
    expect(table.find('h2')).toHaveLength(1)
    expect(table.find('h2').text()).toEqual(title)
    expect(table.find('table')).toHaveLength(1)
    expect(table.find('thead')).toHaveLength(1)
    expect(table.find('tr')).toHaveLength(3)
    expect(table.find('th')).toHaveLength(6)
    expect(table.find('tbody')).toHaveLength(1)
    expect(table.find('tbody').containsMatchingElement(rows)).toBeTruthy()
  })

  it('renders the same as last time', () => {
    const tree = renderer
      .create(tableComponent)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
