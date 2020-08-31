import React from 'react'
import { renderWithProviders, rootInitialState } from '../../utils/test-utils'
import { fruit } from '../../utils/test-helper'

import Modal from './Modal'

const component = <Modal fruit={fruit} />

describe('the modal component', () => {
  it('functions as expected', () => {
    const { getByTestId } = renderWithProviders(component, {
      ...rootInitialState,
      modal: { ...rootInitialState.modal, toggle: true }
    })
    expect(getByTestId('edit-form-title')).toBeTruthy()
  })

  it('renders the same as last time', () => {
    const { container } = renderWithProviders(component)
    expect(container).toMatchSnapshot()
  })
})
