import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Alert from './Alert'

const value = true
const mockDispatch = jest.fn().mockReturnValue(!value)
jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockReturnValue(true),
  useDispatch: () => mockDispatch
}))

describe('the Alert component', () => {
  const message = "test"
  const component = <Alert message={message} />

  it('renders on mount functions as expected', () => {
    const { getByTestId } = render(component)
    fireEvent.click(getByTestId('close-button'))
    expect(mockDispatch).toHaveBeenCalledTimes(1)
  })

  it('renders the same as last time with props', () => {
    const { container } = render(component)
    expect(container).toMatchSnapshot()
  })
})
