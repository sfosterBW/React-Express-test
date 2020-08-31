import React from 'react'
import { render } from '@testing-library/react'

import Banner from './Banner'

describe('the Alert component', () => {
  const size = 'large'
  const title = 'Title'
  const component = <Banner size={size} title={title} />

  test('renders with the right structure', () => {
    const { getByText, getByTestId } = render(component)
    expect(getByTestId('wrapper')).toBeTruthy()
    expect(getByText(title)).toBeInTheDocument()
  })

  test('renders the same as last time', () => {
    const { container } = render(component)
    expect(container).toMatchSnapshot()
  })
})
