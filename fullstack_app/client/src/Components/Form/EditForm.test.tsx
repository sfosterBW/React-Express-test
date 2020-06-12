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
    const { getByLabelText, getByTestId } = render(component)
    const testName = "Apple"
    const testDescription = "I don't like doctors"

    fireEvent.click(getByTestId('toggle'))
    fireEvent.change(getByLabelText('Add a fruit'), {
      target: { value: testName }
    })
    fireEvent.change(getByLabelText('Description'), {
      target: { value: testDescription }
    })
    fireEvent.click(getByTestId('submit-edit'))

    expect(mockDispatch.mock.calls[1][0].payload.message)
      .toBe(`${testName} has been updated`)
  })

  it('renders the same as last time', () => {
    const { container } = render(component)
    expect(container).toMatchSnapshot()
  })
})
