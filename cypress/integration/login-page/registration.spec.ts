
describe('Registration Page', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.contains('Registration').click();
  });
  it('should open registration forms', () => {
    cy.get('mat-form-field').should('have.length', 6);
  });
  it('should successfully register', () => {
    cy.fixture('registration_data').then((jsonData) => {
      cy.registration(jsonData);
    });
    // TODO: добавить проверку, что в БД добавлена запись
    cy.location('pathname').should('eq', '/');
  });
});
