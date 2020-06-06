import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { emptyList, list } from '../../utils/test-helper'

import List from './List'

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch
}))

describe('the List component', () => {
  describe('works with no fruit', () => {
    const component = <List fruits={emptyList} />
    const wrapper = mount(component)

    it('renders with the right structure', () => {
      expect(wrapper).toBeDefined()
      expect(wrapper.find('section')).toHaveLength(1)
      expect(wrapper.find('div')).toHaveLength(2)
      expect(wrapper.find('button')).toHaveLength(3)
      expect(wrapper.find('button').at(0).text()).toEqual("All")
      expect(wrapper.find('button').at(1).text()).toEqual("Best")
      expect(wrapper.find('button').at(2).text()).toEqual("Not best")
    })

    it('renders the same as last time', () => {
      const tree = renderer
        .create(component)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('works with fruit', () => {
    const component = <List fruits={list} />
    const wrapper = mount(component)

    it('renders with the right structure', () => {
      expect(wrapper).toBeDefined()
      expect(wrapper.find('section')).toHaveLength(1)
      expect(wrapper.find('div.row')).toHaveLength(list.length)
      wrapper.find('h3').forEach((title, i) =>
        expect(title.text()).toEqual(list[i].name)
      )
      expect(wrapper.find('button')).toHaveLength((list.length * 2) + 3)
    })

    it('renders the same as last time', () => {
      const tree = renderer
        .create(component)
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
