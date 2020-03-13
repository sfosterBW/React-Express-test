describe('The home page', () => {

  before(() => {
    cy.visit('http://localhost:3000')
    cy.title().should('eq', 'React App')
  })

  it('should have a nav', () => {
    cy.get('nav').should('exist')
    cy.get('form').should('not.exist')
  })

  it('Should have a title', () => {
    cy.get('h1').should('have.text', 'Add Fruit and stuff')
  })

  it('should navigate to the add page', () => {
    cy.get('nav').find('a').contains('Add new fruit').click()
    cy.get('form').should('exist')
  })

  it('should navigate to the edit page', () => {
    cy.get('nav').find('a').contains('Edit fruit').click()
    cy.get('h1').should('have.text', 'True table')
  })

  it('should return to the home page', () => {
    cy.get('nav div>a').first().click()
    cy.get('h1').should('have.text', 'Add Fruit and stuff')
  })
})
