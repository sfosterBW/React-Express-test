import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { fruit } from '../../utils/test-helper'

import FruitItem from './FruitItem'

afterEach(cleanup)

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch
}))

describe('the FruitItem component', () => {
  const component = <FruitItem fruit={fruit} />

  it('functions as expected',() => {
    const { getByTestId } = render(component)

    expect(getByTestId('fruit-item-best')).toHaveTextContent(String(fruit.best))

    if (fruit.description) {
      expect(getByTestId('fruit-item-description'))
        .toHaveTextContent(String(fruit.description))
    }

    fireEvent.click(getByTestId('update-button'))
    expect(mockDispatch.mock.calls).toHaveLength(1)

    fireEvent.click(getByTestId('remove-button'))
    expect(mockDispatch.mock.calls).toHaveLength(2)
  })

  it('renders the same as last time', () => {
    const { container } = render(component)
    expect(container).toMatchSnapshot()
  })
})
