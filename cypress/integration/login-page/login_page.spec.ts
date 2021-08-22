
describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('mat-form-field').first().as('loginField');
    cy.get('mat-form-field').last().as('passwordField');
    cy.get('.login-form button').as('loginBtn');
    cy.contains('Registration').as('RegBtn');
  });

  describe('default state', () => {
    it('displays login page by default', () => {
      cy.url().should('include', '/login');
      cy.get('form input').should('have.length', 2);

      cy.get('@loginField').find('label').should('have.text', 'Login');

      cy.get('@passwordField').find('label').should('have.text', 'Password');

      cy.get('@loginBtn').should('have.text', 'Login');
      cy.get('@RegBtn').should('have.text', 'Registration');
    });
  });

  it.skip('changes labels to placeholder', () => {
    cy.get('@loginField').find('input').click();
    cy.get('@loginField').should('have.attr', 'placeholder', 'Ivan');
    cy.get('@passwordField').click();
    cy.get('@passwordField').should('have.attr', 'placeholder', '****');
  });

  describe('should login', () => {
    it('with correct login by default user', () => {
      cy.fixture('default_user').then(jsonData => {
        cy.login(jsonData.login, jsonData.password);
      });
      cy.location('pathname').should('eq', '/');
    });
  });

  describe('should not login', () => {
    it('without login and password', () => {
      cy.get('@loginBtn').click();
      cy.url().should('include', '/login');
    });

    it('without login', () => {
      cy.fixture('default_user').then(jsonData => {
        cy.get('@loginField').type(jsonData.login);
      });
      cy.get('@loginBtn').click();
      cy.url().should('include', '/login');
    });

    it('without password', () => {
      cy.fixture('default_user').then(jsonData => {
        cy.get('@passwordField').type(jsonData.password);
      });
      cy.get('@loginBtn').click();
      cy.url().should('include', '/login');
    });
  });
});
