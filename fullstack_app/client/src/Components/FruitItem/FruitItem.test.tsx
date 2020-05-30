
import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import FruitItem from './FruitItem'

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch
}))

describe('the FruitItem component', () => {

  const fruit = {id: "1", name:"apple", best:false}
  const component = <FruitItem fruit={fruit} />
  const wrapper = mount(component)

  it('renders with the correct structure', () => {
    expect(wrapper).toBeDefined()
    expect(wrapper.find('div')).toHaveLength(6)
    expect(wrapper.find('h3')).toHaveLength(3)
    expect(wrapper.find('h3').at(0).text()).toEqual(fruit.name)
    expect(wrapper.find('h3').at(1).text()).toEqual("Best")
    expect(wrapper.find('label')).toHaveLength(1)
    expect(wrapper.find('label').text()).toEqual(String(fruit.best))
    expect(wrapper.find('label').props().htmlFor).toEqual(String(fruit.id))
    expect(wrapper.find('input')).toHaveLength(1)
    expect(wrapper.find('input').props().name).toEqual(String(fruit.id))
    expect(wrapper.find('input').props().type).toEqual('checkbox')
    expect(wrapper.find('button')).toHaveLength(2)
    expect(wrapper.find('button').at(0).props().name).toEqual('modal')
    expect(wrapper.find('button').at(1).props().name).toEqual('remove')
  })

  it('functions as expected',() => {
    wrapper.find('button').at(0).simulate('click')
    wrapper.find('button').at(1).simulate('click')
    wrapper.find('input').simulate('change')
    expect(mockDispatch).toHaveBeenCalledTimes(1)
  })

  it('renders the same as last time', () => {
    const tree = renderer
      .create(component)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
