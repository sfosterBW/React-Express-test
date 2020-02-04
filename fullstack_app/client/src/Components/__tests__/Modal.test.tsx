
import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import Modal from '../Modal'
import { rootReducer } from '../../utils/store'

describe('the Modal component', () => {

  const modalValue = true
  const mockStore = createStore(rootReducer, { modal: { toggle: modalValue } })
  const mockFunction = jest.fn()
  const mockFruit = {
    _id: 1,
    name: "False Case",
    best: false
  }
  const title = "This is a title"
  const modalComponent =
    <Provider store={mockStore}>
      <Modal fruit={mockFruit} handleSubmit={mockFunction} title={title} />
    </Provider>

  const modal = mount(modalComponent)

  it('renders with the correct structure', () => {
    expect(modal).toBeDefined()
    expect(modal.find('div')).toHaveLength(5)
    expect(modal.find('div.modal-wrapper')).toHaveLength(1)
    expect(modal.find('div.modal')).toHaveLength(1)
    expect(modal.find('h2.modal-title')).toHaveLength(1)
    expect(modal.find('h2.modal-title').text()).toEqual(title)
    expect(modal.find('form')).toHaveLength(1)
    expect(modal.find('button.closeButton')).toHaveLength(1)
  })

  it('functions as expected', () => {
    modal.find('button.closeButton').simulate('click')
    expect(modal.find('div')).toHaveLength(1)
  })

  it('renders the same as last time', () => {
    const tree = renderer
      .create(modalComponent)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
