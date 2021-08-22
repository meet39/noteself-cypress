interface RegData {
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  password: string,
  passwordConfirm: string
}

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    login(login: string, password: string): void;
    registration(regData: RegData): void;
    getInputByName(name: string): Chainable<Element>;
  }
}
Cypress.Commands.add('getInputByName', (name) => {
  return cy.get(`[formcontrolname=${name}]`);
});

Cypress.Commands.add('login', (login, password) => {
  cy.getInputByName('name').type(login);
  cy.getInputByName('password').type(password);
  cy.get('.login-form button').click();
});
Cypress.Commands.add('registration', (data: RegData) => {
  cy.getInputByName('firstName').type(data.firstName);
  cy.getInputByName('lastName').type(data.lastName);
  cy.getInputByName('phone').type(data.phone);
  cy.getInputByName('email').type(data.email);
  cy.getInputByName('password').type(data.password);
  cy.getInputByName('passwordConfirm').type(data.passwordConfirm);
  cy.get('form button').click();
});
