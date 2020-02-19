module.exports = class HomePage {

  checkReady() {
    $('h1').waitForDisplayed()
  }

  tableTrueTopColumnByName(value) {
    switch (value) {
      case "id":
        return this.tableTrueTopRow.$$('td')[0]
      case "name":
        return this.tableTrueTopRow.$$('td')[1]
      case "best":
        return this.tableTrueTopRow.$$('td')[2]
      case "edit":
        return this.tableTrueTopRow.$$('td')[3]
      case "update":
        return this.tableTrueTopRow.$$('td')[4]
      case "remove":
        return this.tableTrueTopRow.$$('td')[5]
      default:
        throw new Error("OH NO!")
    }
  }

  get form() {
    return $('header').$('form')
  }

  get formTitle() {
    return this.form.$('h2')
  }

  get formNameInput() {
    return this.form.$('input[name="name"]')
  }

  get formBestInput() {
    return this.form.$('input[name="best"]')
  }

  get formSubmitButton() {
    return this.form.$('button')
  }

  get modal() {
    return $('div.modal')
  }

  get modalTitle() {
    return this.modal.$('h2')
  }

  get modalForm() {
    return this.modal.$('form')
  }

  get modalFormTitle() {
    return this.modalForm.$('h2')
  }

  get modalFormNameInput() {
    return this.modalForm.$('input[name="name"]')
  }

  get modalFormBestInput() {
    return this.modalForm.$('input[name="best"]')
  }

  get modalFormButton() {
    return this.modalForm.$('button')
  }

  get tableTrue() {
    return $('table')
  }

  get tableTrueTopRow() {
    return $('tbody').$('tr')
  }

  get tableFalse() {
    return $('table')[1]
  }

  get title() {
    return $('h1')
  }

  initiateHomePage() {
    browser.pause(3000) //Wait for server to spin up
    browser.switchWindow('React App')
  }

  addFruitToForm(name, best) {
    this.form.waitForExist()
    this.formNameInput.setValue(name)
    best && this.formBestInput.click()
  }

  submitForm() {
    this.formSubmitButton.click()
  }

  removeTopItem() {
    this.tableTrueTopColumnByName("remove").$('button').click()
  }

  openTopItemModal() {
    this.tableTrueTopColumnByName("update").$('button').click()
    this.modal.waitForExist()
  }

  submitModalForm(name, best) {
    this.modal.waitForExist()
    this.modalFormNameInput.setValue(name)
    if(String(best) !== this.modalFormBestInput.getAttribute("checked")) {
      this.modalFormBestInput.click()
    } else {
      console.log("You aren't changing this value")
    }
    this.modalFormButton.click()
  }
}
