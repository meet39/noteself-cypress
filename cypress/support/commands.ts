// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    login(login: string, password: string): void;
    registration(
      firstname: string,
      lastname: string,
      phone: string,
      email: string,
      password: string,
      confirmPassword: string
    ): void;
    dataCy(value: string): Chainable<Element>
  }
}

Cypress.Commands.add('login', (login, password) => {
  cy.get('input[formcontrolname=name]').type(login);
  cy.get('input[formcontrolname=password]').type(password);
  cy.get('.login-form button').click();
});
Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-cy=${value}]`);
});
