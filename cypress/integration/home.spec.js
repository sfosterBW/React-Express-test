const url = 'http://localhost:3000'
const resetUrl = 'http://localhost:9000/testing/reset'

describe('The home page', function() {
  beforeEach(function() {
    cy.request('POST', resetUrl)
    cy.visit(url)
    cy.title().should('eq', 'Fruit Dashboard')
  })

  it('should have a nav', function() {
    cy.get('nav').should('exist')
    cy.get('form').should('not.exist')
  })

  it('Should have a title', function() {
    cy.get('h1').should('have.text', 'Add Fruit and stuff')
  })

  it('should navigate to the add page', function() {
    cy.get('nav').find('a').contains('Add new fruit').click()
    cy.get('form').should('exist')
  })

  it('should navigate to the edit page', function() {
    cy.get('nav').find('a').contains('Edit fruit').click()
    cy.get('h1').should('have.text', 'Edit your Fruit')
  })

  it('should return to the home page', function() {
    cy.get('nav div>a').first().click()
    cy.get('h1').should('have.text', 'Add Fruit and stuff')
  })
})
