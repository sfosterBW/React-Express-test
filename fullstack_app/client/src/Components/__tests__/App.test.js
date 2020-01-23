
import React from 'react'
import { mount, render, shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import * as api from './../../utils/api'

import App from '../App'

jest.mock('./../../utils/api')

describe('the app component', () => {
  it('shallow renders', () => {
    const getSpy = jest.spyOn(api, 'fetchFruit')
    const app = mount(<App />)
    expect(app).toBeDefined()
  })

  it('renders the same as last time', () => {
    const tree = renderer
      .create(<App />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
