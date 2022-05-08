import { loginPage } from "../page_objects/loginPage"

describe ('login POM', () => {

    it('01 - Login with valid data - successful', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/login'
        }).as('successfullLogin');

        cy.visit('/login');
        cy.url().should('contains','/login');
        loginPage.loginHeading.should('have.text','Please login');
        loginPage.login('romanabenin21@yahoo.com','romanica123');

        cy.wait('@successfullLogin').then(interception=> {
            console.log('RESPONSE', interception);
            expect(interception.response.statusCode).eq(200);
        })

    })

    it('02 - Login with invalid password - negative', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/login'
        }).as('unsuccessfullLogin');

        cy.visit('/login');
        cy.url().should('contains','/login');
        loginPage.loginHeading.should('have.text','Please login');
        loginPage.login('romanabenin21@yahoo.com','romanica12356');

        cy.wait('@unsuccessfullLogin').then(interception=> {
            console.log('RESPONSE', interception);
            expect(interception.response.statusCode).eq(401);
            expect(interception.response.statusMessage).eq('Unauthorized');
        })
        
        loginPage.errorMsg.should('be.visible')
             .and('have.text', 'Bad Credentials')
             .and('have.css', 'background-color','rgb(248, 215, 218)');
        cy.url().should('include', '/login');
    })

})