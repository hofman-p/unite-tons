/// <reference path="cypress" />
/// <reference path="../support/index.d.ts" />

describe('Login page', () => {
  it('should be able to login', () => {
    const { email, password } = Cypress.env();
    cy.visit('/login')
      .get('[data-cy=login-email]')
      .type(email)
      .get('[data-cy=login-password]')
      .type(password)
      .get('form')
      .submit();
    cy.location('pathname').should('eq', '/movies');
  });
});
