
describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });
  it('displays login page by default', () => {
    cy.url().should('include', '/login');

    cy.get('.login-form input').should('have.length', 2);
    cy.get('.login-form label').first().should('have.text', 'Login');
    cy.get('.login-form label').last().should('have.text', 'Password');
    cy.get('.login-form button').should('have.text', 'Login');
    cy.get('button.login-btn').should('have.text', 'Registration');
  });

  it('changes labels to placeholder', () => {
    cy.get('#mat-input-0').click();
    cy.get('#mat-input-0').should('have.attr', 'placeholder', 'Ivan');
    cy.get('#mat-input-1').click();
    cy.get('#mat-input-1').should('have.attr', 'placeholder', '****');
  });

  it('correct login by default user', () => {
    cy.fixture('default_user').then(jsonData => {
      cy.login(jsonData.login, jsonData.password);
    });
    cy.location('pathname').should('eq', '/');
  });

  describe('should not login', function () {
    beforeEach(() => {
      cy.get('.login-form button').as('loginBtn');
      cy.get('input[formcontrolname=name]').as('loginField');
      cy.get('input[formcontrolname=password]').as('passwordField');
    });
    it('without login and password', function () {
      cy.get('@loginBtn').click();
      cy.url().should('include', '/login');
    });

    it('without login', function () {
      cy.fixture('default_user').then(jsonData => {
        cy.get('@loginField').type(jsonData.login);
      });
      cy.url().should('include', '/login');
    });
  });
});
