import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import Nav from './Nav'

describe('the Nav component', () => {

  const component = <Nav />
  const wrapper = mount(component)

  it('renders with the correct structure', () => {
    expect(wrapper).toBeDefined()
    expect(wrapper.find('img')).toHaveLength(1)
    expect(wrapper.find('h2')).toHaveLength(1)
    expect(wrapper.find('Link')).toHaveLength(3)
  })

  it('functions as expected',() => {
    expect(wrapper.find('img').props().alt).toBe('logo')
    expect(wrapper.find('h2').text()).toBe('Fruit Dashboard')
    expect(wrapper.find('Link').at(0).props().to).toBe("/")
    expect(wrapper.find('Link').at(1).props().to).toBe("add")
    expect(wrapper.find('Link').at(2).props().to).toBe("edit")
  })

  it('renders the same as last time', () => {
    const tree = renderer
      .create(component)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
