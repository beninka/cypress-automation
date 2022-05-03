/// <reference types="Cypress" />

describe('Test register', () => {

    it('01 - Register with valid data - successful', () =>{
        cy.visit('/register');
        cy.url().should('include', '/register')
        cy.get('#first-name').type('Romana');
        cy.get('#last-name').type('Beninka');
        cy.get('#email').type(`${Math.random().toString(36).substring(2, 11)}@test.com`);
        cy.get('#password').type('romanica123456');
        cy.get('#password-confirmation').type('romanica123456');
        cy.get(':checkbox').check();
        cy.get('button').click();
        cy.url().should('not.include','/register');
    })

    it('02 - Register without first name - negative', () => {
        cy.visit('/register');
        cy.url().should('include','/register');
        cy.get('#last-name').type('Beninka');
        cy.get('#email').type('testtester@gmail.com');
        cy.get('#password').type('romanica123456');
        cy.get('#password-confirmation').type('romanica123456');
        cy.get(':checkbox').check();
        cy.get('button').click();
        cy.url().should('include','/register');
    })

    it('03 - Register without last name - negative', () => {
        cy.visit('/register');
        cy.url().should('include', '/register');
        cy.get('#first-name').type('Romana');
        cy.get('#email').type('testtester@gmail.com');
        cy.get('#password').type('romanica123456');
        cy.get('#password-confirmation').type('romanica123456');
        cy.get(':checkbox').check();
        cy.get('button').click();
        cy.url().should('include','/register');
    })

    it('04 - Register without email - negative', () => {
        cy.visit('/register');
        cy.url().should('include', '/register');
        cy.get('#first-name').type('Romana');
        cy.get('#last-name').type('Beninka');
        cy.get('#password').type('romanica123456');
        cy.get('#password-confirmation').type('romanica123456');
        cy.get(':checkbox').check();
        cy.get('button').click();
        cy.url().should('include','/register');
    })

    it('05 - Register without password - negative', () =>{
        cy.visit('/register');
        cy.url().should('include', '/register');
        cy.get('#first-name').type('Romana');
        cy.get('#last-name').type('Beninka');
        cy.get('#email').type('testtester1234567@gmail.com');
        cy.get('#password-confirmation').type('romanica123456');
        cy.get(':checkbox').check();
        cy.get('button').click();
        cy.url().should('include','/register');
    })

    it('06 - Register without password confirmation - negative', () =>{
        cy.visit('/register');
        cy.url().should('include', '/register');
        cy.get('#first-name').type('Romana');
        cy.get('#last-name').type('Beninka');
        cy.get('#email').type(`${Math.random().toString(36).substring(2, 11)}@test.com`);
        cy.get('#password').type('romanica123456');
        cy.get(':checkbox').check();
        cy.get('button').click();
        cy.url().should('include','/register');
    })

    it('07 - Register without checkbox - negative', () =>{
        cy.visit('/register');
        cy.url().should('include', '/register');
        cy.get('#first-name').type('Romana');
        cy.get('#last-name').type('Beninka');
        cy.get('#email').type(`${Math.random().toString(36).substring(2, 11)}@test.com`);
        cy.get('#password').type('romanica123456');
        cy.get('#password-confirmation').type('romanica123456');
        cy.get('button').click();
        cy.url().should('include','/register');
    })

    it('08 - Register with email without @ - negative', () =>{
        cy.visit('/register');
        cy.url().should('include', '/register');
        cy.get('#first-name').type('Romana');
        cy.get('#last-name').type('Beninka');
        cy.get('#email').type(`${Math.random().toString(36).substring(2, 11)}test.com`);
        cy.get('#password').type('romanica123456');
        cy.get('#password-confirmation').type('romanica123456');
        cy.get(':checkbox').check();
        cy.get('button').click();
        cy.url().should('include','/register');
    })
 
    it('09 - Register with password that has less than 8 chars - negative', () =>{
        cy.visit('/register');
        cy.url().should('include', '/register');
        cy.get('#first-name').type('Romana');
        cy.get('#last-name').type('Beninka');
        cy.get('#email').type(`${Math.random().toString(36).substring(2, 11)}@test.com`);
        cy.get('#password').type('roman12');
        cy.get('#password-confirmation').type('roman12');
        cy.get(':checkbox').check();
        cy.get('button').click();
        cy.url().should('include','/register');
    })

    it('10 - Register with password without special and numeric chars - negative', () =>{
        cy.visit('/register');
        cy.url().should('include', '/register');
        cy.get('#first-name').type('Romana');
        cy.get('#last-name').type('Beninka');
        cy.get('#email').type(`${Math.random().toString(36).substring(2, 11)}@test.com`);
        cy.get('#password').type('romanabenin');
        cy.get('#password-confirmation').type('romanabenin');
        cy.get(':checkbox').check();
        cy.get('button').click();
        cy.url().should('include','/register');
    })

    it('11 - Register with blank fields', () =>{
        cy.visit('/register');
        cy.url().should('include', '/register')
        cy.get('button').click();
        cy.url().should('include','/register');
    })

})