import React from 'react'
import { mount} from 'enzyme'
import renderer from 'react-test-renderer'
import * as api from './../../utils/api'

import App from '../App'



describe('the app component', () => {

  jest.mock('./../../utils/api')
  const getSpy = jest.spyOn(api, 'fetchFruit')
  const appComponent = <App />
  const app = mount(appComponent)


  it('renders with the correct structure', () => {
    expect(app).toBeDefined()
    expect(app.find('div.App')).toHaveLength(1)
    expect(app.find('header.App-header')).toHaveLength(1)
    expect(app.find('Form')).toHaveLength(1)
    expect(app.find('Table')).toHaveLength(2)
    expect(app.find('Table').at(0).props().title).toEqual("True table")
    expect(app.find('Table').at(1).props().title).toEqual("False table")
  })

  it('functions as expected', () => {
    expect(getSpy).toHaveBeenCalled()
  })

  it('renders the same as last time', () => {
    const tree = renderer
      .create(appComponent)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
