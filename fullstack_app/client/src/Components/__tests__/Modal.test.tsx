
import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import Modal from '../Modal'

describe('the Modal component', () => {
  const form = <form />
  const mockFunction = jest.fn()
  const title = "This is a title"
  const modalComponent = <Modal
    form={form}
    onClose={mockFunction()}
    title={title}/>
  const modal = mount(modalComponent)

  it('renders with the correct structure', () => {
    expect(modal).toBeDefined()
    expect(modal.find('div')).toHaveLength(2)
    expect(modal.find('div.modal-wrapper')).toHaveLength(1)
    expect(modal.find('div.modal')).toHaveLength(1)
    expect(modal.find('h2')).toHaveLength(1)
    expect(modal.find('h2').text()).toEqual(title)
    expect(modal.find('form')).toHaveLength(1)
    expect(modal.find('form').containsMatchingElement(form)).toBeTruthy()
    expect(modal.find('button')).toHaveLength(1)
  })

  it('functions as expected', () => {
    modal.find('button').simulate('click')
    expect(mockFunction).toHaveBeenCalled()
  })

  it('renders the same as last time', () => {
    const tree = renderer
      .create(modalComponent)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
