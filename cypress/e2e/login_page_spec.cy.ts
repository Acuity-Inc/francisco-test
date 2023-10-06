describe('The Login Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
    cy.contains('Login Page');
  })
})