const HomePage = require('../pages/Home.page')
const assert = require('assert')

const homePage = new HomePage;

before('wait for app to spin up', () => {
  homePage.initiateHomePage()
})

describe('the homepage', () => {

  it('has a title', () => {
    homePage.title.waitForExist()
    assert(homePage.title.getText() === "Fruit dashboard")
  })

  describe("with nice data", () => {

    const defaultName = ""
    const defaultBest = false
    const name = "Test"
    const best = true
    const updatedName = "Update"
    const updatedBest = true

    it('allows you to fill in the form', () => {
      homePage.addFruitToForm(name, best)
      assert(homePage.formNameInput.getValue() === name)
      assert(homePage.formBestInput.getValue() === String(best))
    })

    it('submits, clears the form and updates the table', () => {
      homePage.submitForm()
      assert(homePage.formNameInput.getValue() === defaultName)
      assert(homePage.formBestInput.getValue() === String(defaultBest))
      assert(homePage.tableTrueTopColumnByName("name").getText() === name)
      assert(homePage.tableTrueTopColumnByName("best").getText() === String(best))
    })

    it('updates an item from the table', () => {
      homePage.openTopItemModal()
      assert(homePage.modal.isExisting() === true)
      assert(homePage.modalFormNameInput.getValue() === name)
      assert(homePage.modalFormBestInput.getValue() === String(best))
    })

    it('submits an update to the name field', () => {
      homePage.submitModalForm(updatedName, updatedBest)
      assert(!homePage.modal.isExisting())
      assert(homePage.tableTrueTopColumnByName("name").getText() === updatedName)
      assert(homePage.tableTrueTopColumnByName("best").getText() === String(updatedBest))
    })

    it('removes an item from the table', () => {
      homePage.removeTopItem()
      assert(!homePage.tableTrueTopRow.isExisting())
    })
  })

  describe('with no data', () => {
    it('shows and alert message when you try to submit', () => {
      homePage.submitForm()
      assert(browser.getAlertText() === "You need to add a name")
    })
  })

})
