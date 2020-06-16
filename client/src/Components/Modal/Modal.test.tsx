import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { fruit } from '../../utils/test-helper'

import Modal from './Modal'

afterEach(cleanup)

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockReturnValue(true),
  useDispatch: () => mockDispatch
}))

const component = <Modal fruit={fruit} />

describe('the modal component', () => {
  it('functions as expected', () => {
    const { getByTestId } = render(component)
    fireEvent.click(getByTestId('close'))

    expect(mockDispatch.mock.calls).toHaveLength(1)
  })

  it('renders the same as last time', () => {
    const { container } = render(component)
    expect(container).toMatchSnapshot()
  })
})
