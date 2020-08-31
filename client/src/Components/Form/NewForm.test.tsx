import React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderWithProviders } from '../../utils/test-utils'

import NewForm from './NewForm'

describe('the Form component', () => {
  const component = <NewForm />

  it('functions properly with props', () => {
    const { getByLabelText, getByTestId } = renderWithProviders(component)
    const testName = 'Apple'
    const testDescription = 'I don\'t like doctors'

    fireEvent.click(getByTestId('toggle'))
    fireEvent.change(getByLabelText('Add a fruit'), {
      target: { value: testName }
    })
    expect(getByLabelText('Add a fruit')).toHaveValue(testName)

    fireEvent.change(getByLabelText('Description'), {
      target: { value: testDescription }
    })
    expect(getByLabelText('Description')).toHaveValue(testDescription)

    fireEvent.click(getByTestId('new-form-submit'))
    expect(getByLabelText('Add a fruit')).toHaveValue('')
    expect(getByLabelText('Description')).toHaveValue('')
  })

  it('renders the same as last time', () => {
    const { container } = renderWithProviders(component)
    expect(container).toMatchSnapshot()
  })
})
