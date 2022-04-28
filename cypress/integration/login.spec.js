/// <reference types="Cypress" />

describe('Login test', () => {

    // it('Visit gallery app', () => {
    //     cy.visit("/");
    //     cy.url().should('eq','https://gallery-app.vivifyideas.com/');
    // })

    // it('Click on login button', () => {
    //     cy.get('a[href="/login"]').click();
    // })

    it('01 - Login with valid credential - successful',() => {
        cy.visit('/login');
        cy.url().should('include', '/login');
        cy.get('#email').type ('romanabenin21@yahoo.com');
        cy.get('#password').type ('romanica123');
        cy.get('button[type="submit"]').click();
        cy.url().should('not.include','/login');
    })

    it('02 - Logout - successful', () => {
        cy.get("a[class='nav-link nav-buttons']").should('have.length',3);
        cy.get("a[class='nav-link nav-buttons']").eq(2).click();
        cy.url().should('include','/login');
    })

    it('03 - Login with blank fileds - negative',() => {
        cy.visit('/login');
        cy.url().should('include', '/login');
        cy.get('button[type="submit"]').click();
        cy.url().should('include','/login');
    })

    it('04 - Login without email - negative',() => {
        cy.visit('/login');
        cy.url().should('include', '/login');
        cy.get('#password').type ('romanica123');
        cy.get('button[type="submit"]').click();
        cy.url().should('include','/login');
    })

    it('05 - Login without password - negative',() => {
        cy.visit('/login');
        cy.url().should('include', '/login');
        cy.get('#email').type ('romanabenin21@yahoo.com');
        cy.get('button[type="submit"]').click();
        cy.url().should('include','/login');
    })

    it('06 - Login with email without @ - negative',() => {
        cy.visit('/login');
        cy.url().should('include', '/login');
        cy.get('#email').type ('romanabenin21yahoo.com');
        cy.get('#password').type ('romanica123');
        cy.get('button[type="submit"]').click();
        cy.url().should('include','/login');
    })

    it('07 - Login with password thaht has less than 8 chars - negative',() => {
        cy.visit('/login');
        cy.url().should('include', '/login');
        cy.get('#email').type ('romanabenin21@yahoo.com');
        cy.get('#password').type ('roma123');
        cy.get('button[type="submit"]').click();
        cy.url().should('include','/login');
    })

    it('08 - Login with password without special and numeric chars - negative',() => {
        cy.visit('/login');
        cy.url().should('include', '/login');
        cy.get('#email').type ('romanabenin21@yahoo.com');
        cy.get('#password').type ('romanicabenin');
        cy.get('button[type="submit"]').click();
        cy.url().should('include','/login');
    })

    it('09 - Login with valid email and invalid password - negative',() => {
        cy.visit('/login');
        cy.url().should('include', '/login');
        cy.get('#email').type ('romanabenin21@yahoo.com');
        cy.get('#password').type ('romanica12');
        cy.get('button[type="submit"]').click();
        cy.url().should('include','/login');
    })

    
    it('10 - Login with invalid email and valid password - negative',() => {
        cy.visit('/login');
        cy.url().should('include', '/login');
        cy.get('#email').type ('romanabenin@yahoo.com');
        cy.get('#password').type ('romanica123');
        cy.get('button[type="submit"]').click();
        cy.url().should('include','/login');
    })

})