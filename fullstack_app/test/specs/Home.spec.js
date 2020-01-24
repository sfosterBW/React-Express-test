const HomePage = require('../pages/Home.page')
const assert = require('assert')

const homePage = new HomePage;

describe('the homepage', () => {
  before('loads', () => {
    homePage.checkReady()
  })

  it('loads again', () => {
    homePage.checkReady()
  })
})
