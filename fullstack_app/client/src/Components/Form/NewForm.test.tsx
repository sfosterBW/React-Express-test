import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'

import NewForm from './NewForm'

afterEach(cleanup)

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch
}))

describe('the Form component', () => {
  const component = <NewForm />

  it('functions properly with props', () => {
    const { getByTestId } = render(component)
    const testValue = "Apple"

    fireEvent.click(getByTestId('toggle'))
    fireEvent.change(getByTestId('input-text'), {
      target: { value: testValue }
    })
    fireEvent.click(getByTestId('submit-new'))

    expect(mockDispatch.mock.calls[1][0].payload.message)
      .toBe(`${testValue} has been added`)
  })

  it('renders the same as last time', () => {
    const { container } = render(component)
    expect(container).toMatchSnapshot()
  })
})
