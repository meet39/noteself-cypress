
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
      cy.fixture('users').then(jsonData => {
        cy.login(jsonData[0]);
      });
      cy.location('pathname').should('eq', '/');
    });
  });

  describe('should not login', function () {
    beforeEach(() => {
      cy.fixture('users').then(function (jsonData) {
        this.user = jsonData[0];
        this.unregUser = jsonData[1];
      });
    });
    it('without login and password', () => {
      cy.get('@loginBtn').click();
      cy.url().should('include', '/login');
    });
    it('without login and with correct pass', function () {
      cy.login({
        login: this.user.login,
        password: 'some password'
      });
      cy.url().should('include', '/login');
    });

    it('without password and with correct login', function () {
      cy.get('@passwordField').type(this.user.password);
      cy.get('@loginBtn').click();
      cy.url().should('include', '/login');
    });
    it('with non-existing user', function () {
      cy.login(this.unregUser);

      // TODO: добавить проверку на появление ошибки
      cy.url().should('include', '/login');
    });
  });
});
