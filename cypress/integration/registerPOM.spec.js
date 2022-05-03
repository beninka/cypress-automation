/// <reference types="Cypress" />

import { registerPage } from "../page_objects/registerPage";
import { faker } from '@faker-js/faker';

describe('Register POM', () => {

    let registerData = {
        firstName:faker.name.firstName(),
        lastName:faker.name.lastName(),
        email:faker.internet.email(),
        password:faker.internet.password()
    }

    before('Visit register page', () => {
        cy.visit('/register')
        cy.url().should('include', '/register')
    })

    it('Register with valid data', () => {
        registerPage.register(
            registerData.firstName,
            registerData.lastName,
            registerData.email,
            registerData.password
        )
        cy.url().should('not.include','/register')
    })

})