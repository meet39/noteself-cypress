describe('Registration Page', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.contains('Registration').click();
  });
  it('should open registration forms', () => {
    cy.get('mat-form-field').should('have.length', 6);
  });

  it('should successfully register', () => {
    cy.fixture('reg_data').then((jsonData) => {
      // TODO: добавить проверку, что в БД добавлена запись
      // jsonData.email = faker.internet.email();
      cy.registration(jsonData);
    });
    cy.location('pathname').should('eq', '/');
  });

  describe('should not register', () => {
    it('with existing user data', () => {
      cy.fixture('existing_reg_data').then((jsonData) => {
        cy.registration(jsonData);
      });
      cy.url().should('contain', '/login');
      // TODO: проверить, что в БД не добавлена ещё одна запись
      // TODO: проверить, что появилась ошибка (не реализовано)
    });

    cy.fixture('user');
    ['', ''].forEach((myCase) => {
      it(`${myCase}`, () => {

      });
    });
  });
});
