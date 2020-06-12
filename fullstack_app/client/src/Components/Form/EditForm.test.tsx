import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { fruit } from '../../utils/test-helper'

import EditForm from './EditForm'

afterEach(cleanup)

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch
}))

describe('the Edit Form component', () => {
  const component = <EditForm fruit={fruit} />

  it('functions properly with props', () => {
    const { getByTestId } = render(component)
    const testValue = "Apple"

    fireEvent.click(getByTestId('toggle'))
    fireEvent.change(getByTestId('input-text'), {
      target: { value: testValue }
    })
    fireEvent.click(getByTestId('submit-edit'))

    expect(mockDispatch.mock.calls[1][0].payload.message)
      .toBe(`${testValue} has been updated`)
  })

  it('renders the same as last time', () => {
    const { container } = render(component)
    expect(container).toMatchSnapshot()
  })
})
