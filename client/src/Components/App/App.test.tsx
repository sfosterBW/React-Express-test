import React from 'react'
import { render, cleanup } from '@testing-library/react'

import App from './App'

afterEach(cleanup)

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch
}))

describe('the app component', () => {
  jest.mock('./../../utils/api')
  const component = <App />

  it('renders the same as last time', () => {
    const { container } = render(component)
    expect(container).toMatchSnapshot()
  })
})
