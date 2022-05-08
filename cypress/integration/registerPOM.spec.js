/// <reference types="Cypress" />

import { registerPage } from "../page_objects/registerPage";
import { allGalleries } from "../page_objects/allGalleriesPredavanje";
import { faker } from '@faker-js/faker';

describe('Register POM', () => {

    let registerData = {
        firstName:faker.name.firstName(),
        lastName:faker.name.lastName(),
        email:faker.internet.email(),
        password:faker.internet.password() + "123"
    }

    beforeEach('Visit register page', () => {
        cy.visit('/register');
        cy.url().should('include', '/register');
    })


    it('01 - Register without first name', () => {
        registerPage.registerHeading.should('have.text', 'Register');
        registerPage.register(
            " ",
            registerData.lastName,
            registerData.email,
            registerData.password
        )
        registerPage.errorMsg
            .should('be.visible')
            .and('have.text', 'The first name field is required.')

    })

    it('02 - Register with invalid email ', () => {
        registerPage.registerHeading.should('have.text', 'Register');
        registerPage.register(
            registerData.firstName,
            registerData.lastName,
            "test.mail",
            registerData.password
        )
        registerPage.emailInput.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please include an \'@\' in the email address. \'test.mail\' is missing an \'@\'.')
        })
    })

    it('03 - Register with existing email ', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/register'
        }).as('unsuccessfullRegister');

        registerPage.registerHeading.should('have.text', 'Register');
        registerPage.register(
            registerData.firstName,
            registerData.lastName,
            "romanabenin21@yahoo.com",
            registerData.password
        );

        cy.wait('@unsuccessfullRegister').then (interception => {
            expect(interception.response.statusCode).eq(422);
        });

        registerPage.errorMsg
            .should('be.visible')
            .and('have.text', 'The email has already been taken.')
    })

    it('04 - Register with valid data - successfull', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/register'
        }).as('successfullRegister');

        registerPage.registerHeading.should('have.text', 'Register');
        registerPage.register(
            registerData.firstName,
            registerData.lastName,
            registerData.email,
            registerData.password
        );

        cy.wait('@successfullRegister').then (interception => {
            expect(interception.response.statusCode).eq(200);
            expect(interception.response.statusMessage).eq('OK');
        });

        allGalleries.allGalleriesHeading.should('have.text', 'All Galleries');
    })

})