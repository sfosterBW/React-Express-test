import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderWithProviders } from '../../utils/test-utils'
import { fruit } from '../../utils/test-helper'

import EditForm from './EditForm'

describe('the Edit Form component', () => {
  const component = <EditForm fruit={fruit} />

  it('functions properly with props', () => {
    const { getByLabelText, getByTestId } = renderWithProviders(component)
    const testName = 'Banana'
    const testDescription = 'Hilarious'

    fireEvent.click(getByTestId('toggle'))
    fireEvent.change(getByLabelText('Add a fruit'), {
      target: { value: testName }
    })
    expect(getByLabelText('Add a fruit')).toHaveValue(testName)

    fireEvent.change(getByLabelText('Description'), {
      target: { value: testDescription }
    })
    expect(getByLabelText('Description')).toHaveValue(testDescription)

    fireEvent.click(getByTestId('edit-form-submit'))
    expect(getByLabelText('Add a fruit')).toHaveValue(fruit.name)
    expect(getByLabelText('Description')).toHaveValue(fruit.description)
  })

  it('renders the same as last time', () => {
    const { container } = renderWithProviders(component)
    expect(container).toMatchSnapshot()
  })
})
