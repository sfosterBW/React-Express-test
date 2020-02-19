
import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import Row from '../Row'

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch
}))

describe('the Row component', () => {

  const fruit = {_id: 1, name:"apple", best:false}
  const rowComponent = <Row fruit={fruit} />
  const row = mount(rowComponent)

  it('renders with the correct structure', () => {
    expect(row).toBeDefined()
    expect(row.find('tr')).toHaveLength(1)
    expect(row.find('td')).toHaveLength(6)
    expect(row.find('p')).toHaveLength(2)
    expect(row.find('label')).toHaveLength(1)
    expect(row.find('label').text()).toEqual(fruit.name)
    expect(row.find('label').props().htmlFor).toEqual(String(fruit._id))
    expect(row.find('input')).toHaveLength(1)
    expect(row.find('input').props().name).toEqual(String(fruit._id))
    expect(row.find('input').props().type).toEqual('checkbox')
    expect(row.find('button')).toHaveLength(2)
    expect(row.find('button').at(0).props().name).toEqual('modal')
    expect(row.find('button').at(1).props().name).toEqual('remove')
  })

  it('functions as expected',() => {
    row.find('button').at(0).simulate('click')
    row.find('button').at(1).simulate('click')
    row.find('input').simulate('change')
  })

  it('renders the same as last time', () => {
    const tree = renderer
      .create(rowComponent)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
