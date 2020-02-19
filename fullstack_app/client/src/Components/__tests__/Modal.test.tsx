
import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import Modal from '../Modal'

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch
}))

const mockFruit = {
  _id: 1,
  name: "False Case",
  best: false
}
const mockClickFunction = jest.fn()
const mockToggle = true
const title = "This is a title"
const modalComponent = <Modal
  fruit={mockFruit}
  handleClick={() => mockClickFunction()}
  title={title}
  toggle={mockToggle}/>
const modal = mount(modalComponent)

describe('the Modal component', () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

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
  })

  it('renders the same as last time', () => {
    const tree = renderer
      .create(modalComponent)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

})
