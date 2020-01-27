const HomePage = require('../pages/Home.page')
const assert = require('assert')

const homePage = new HomePage;

describe('the homepage', () => {
  before('wait for app to spin up', () => {
    browser.pause(6000) //Wait for server to spin up
    browser.switchWindow('React App')
    homePage.title.waitForExist()
  })

  it('has a title', () => {
    assert(homePage.title.getText() === "Fruit dashboard", 'Title is not right')
  })

})
