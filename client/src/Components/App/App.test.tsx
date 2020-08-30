import React from 'react'
import { renderWithProviders } from 'utils/test-utils'

import App from './App'

describe('the app component', () => {
  jest.mock('./../../utils/api')
  const component = <App />

  it('renders the same as last time', () => {
    const { container } = renderWithProviders(component)
    expect(container).toMatchSnapshot()
  })
})
