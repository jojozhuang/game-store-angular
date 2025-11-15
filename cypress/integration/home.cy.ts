/// <reference types="cypress" />

describe('Game Store', () => {
  const delay = 1000; // 1 second

  beforeEach(() => {
    cy.visit('/');
    cy.wait(delay); // wait 1 second before running each test
  });

  it('should display the app name on the home page', () => {
    cy.contains('Angular Tutorial - Product Management');
    cy.get('h1').should('contain.text', 'Game Store - Product Management');
  });

  it('should navigate to product list page', () => {
    cy.get('[routerlink="products"]').click();
    cy.get('app-products > .container > h2').should('contain.text', 'Products');
  });

  it('should navigate to product add page', () => {
    cy.get('[routerlink="product"]').click();
    cy.get('app-product > .container > h2').should('contain.text', 'Create New Product');
  });
});
