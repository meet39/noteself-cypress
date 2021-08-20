describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://94.228.115.150:3000');
  });
  it.skip('displays login page by default', () => {
    cy.get('.login-form input').should('have.length', 2);
    cy.get('.login-form label').first().should('have.text', 'Login');
    cy.get('.login-form label').last().should('have.text', 'Password');
    cy.get('.login-form button').last().should('have.text', 'Login');
    cy.get('button.login-btn').last().should('have.text', 'Registration');
  });

  it('changes labels to placeholder', () => {
    cy.get('.login-form input').first().click()
    cy.get('.login-form input').last().click()
  })


})