// https://docs.cypress.io/api/introduction/api.html

describe('Home', () => {
  it('Visits Home', () => {
    cy.visit('/');
    cy.contains('p', 'Home');
  });
});

describe('Settings', () => {
  it('Visits the settings', () => {
    cy.visit('/settings');
    cy.contains('p', 'Settings');
  });
});

describe('Login', () => {
  it('Visits the login', () => {
    cy.visit('/login');
    cy.contains('span', 'Login');
  });
});
