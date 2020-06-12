import React from 'react'
import { render, cleanup } from '@testing-library/react'

import Nav from './Nav'

afterEach(cleanup)

describe('the Nav component', () => {
  const component = <Nav />

  it('functions as expected', () => {
    const { getByTestId } = render(component)
    expect(getByTestId('logo-link')).toHaveAttribute('href', '/')
    expect(getByTestId('home-link')).toHaveAttribute('href', '/')
    expect(getByTestId('add-link')).toHaveAttribute('href', '/add')
    expect(getByTestId('edit-link')).toHaveAttribute('href', '/edit')
  })

  it('renders the same as last time', () => {
    const { container } = render(component)
    expect(container).toMatchSnapshot()
  })
})
