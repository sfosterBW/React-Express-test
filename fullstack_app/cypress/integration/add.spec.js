const url = 'http://localhost:3000'
const resetUrl = 'http://localhost:9000/testing/reset'
const newFruit = {
  name: "orange",
  best: false
}

describe('The add page', function() {
  beforeEach(function() {
    cy.request('POST', resetUrl)
    cy.visit(`${url}/add`)
    cy.title().should('eq', 'Fruit Dashboard')
  })

  it('should display a form', function() {
    cy.get('h2').should('have.text', 'Add a new fruit')
  })

  it.only('should add a new fruit', function() {
    cy.get('#name').type(newFruit.name)
    cy.get('button').contains('Add new fruit').click()
    cy.get('#name').should('have.value', '')

    cy.visit(`${url}/edit`)
    cy.get('h3').should('have.text', newFruit.name)
  })
})
