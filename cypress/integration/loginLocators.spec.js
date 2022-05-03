/// <reference types="Cypress" />

const Locators = require('../fixtures/Locators.json');

describe('Login with locators', () => {

    before('Visit login page', () => {
        cy.visit('/login');
    })

    it('Login with valid data - successful', () => {
        cy.visit('/login');
        cy.get(Locators.Login.emailInput).type('romanabenin21@yahoo.com');
        cy.get(Locators.Login.passwordInput).type('romanica123');
        cy.get(Locators.Login.submitBtn).click();
        cy.url().should('not.include', '/login');

    })

    it('02 - Logout - successful', () => {
        cy.get(Locators.Logout.logoutBtn).eq(2).click();
        cy.url().should('include','/login');
    })

})