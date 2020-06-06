import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import Banner from './Banner'

describe('the Alert component', () => {
  const size = "large"
  const title = "Title"
  const component = <Banner size={size} title={title}/>
  const wrapper = mount(component)

  it('renders with the right structure', () => {
    expect(wrapper).toBeDefined()
    expect(wrapper.find('section')).toHaveLength(1)
    expect(wrapper.find('div')).toHaveLength(1)
    expect(wrapper.find('h1')).toHaveLength(1)
    expect(wrapper.find('h1').text()).toEqual(title)
  })

  it('renders the same as last time with props', () => {
    const tree = renderer
      .create(component)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
