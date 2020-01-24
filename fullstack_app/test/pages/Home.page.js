module.exports = class HomePage {

  checkReady() {
    $('h1').waitForExist()
  }

  get title() {
    return $('h1')
  }

  get form() {
    return $('form')
  }

  get formTitle() {
    return $('form').$('h2')
  }

  get formNameInput() {
    return $('form').$('input[name="name"]')
  }

  get formBestInput() {
     return $('form').$('input[name="best"]')
  }

  createHomePage(){
    this.checkReady()
  }

}