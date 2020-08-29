import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import NewForm from './NewForm'

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch
}))

describe('the Form component', () => {
  const component = <NewForm />

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

    fireEvent.click(getByTestId('submit-new'))

    expect(mockDispatch.mock.calls[1][0].payload.message)
      .toBe(`${testName} has been added`)
  })

  it('renders the same as last time', () => {
    const { container } = render(component)
    expect(container).toMatchSnapshot()
  })
})
