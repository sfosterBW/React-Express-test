
import React from 'react'
import { mount, render, shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import { InputText, InputCheckbox } from '../Input'

describe('the InputText component', () => {
  it('shallow renders', () => {
    const inputText = mount(<InputText />)
    expect(inputText).toBeDefined()
  })

  it('renders the same as last time', () => {
    const tree = renderer
      .create(<InputText />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('the InputCheckbox component', () => {
  it('shallow renders', () => {
    const inputCheckbox = mount(<InputCheckbox />)
    expect(inputCheckbox).toBeDefined()
  })

  it('renders the same as last time', () => {
    const tree = renderer
      .create(<InputCheckbox />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
