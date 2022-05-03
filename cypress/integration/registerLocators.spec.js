/// <reference types="Cypress"/>

import { faker } from '@faker-js/faker';
const Locators = require('../fixtures/Locators.json');

describe('test register', () => {

    let registerData = {
        firstName: '',
        lastName: '',
        randomEmail: '',
        password: ''
    }

    beforeEach('generate new fake data', ()=> {
        registerData.firstName = faker.name.firstName();
        registerData.lastName = faker.name.lastName();
        registerData.randomEmail = faker.internet.email();
        registerData.password = faker.internet.password();
    })

    it('01 - Register without first name - negative', () => {
        cy.visit('/register');
        cy.url().should('include','/register');
        cy.get(Locators.Register.lastNameInput).type(registerData.lastName);
        cy.get(Locators.Register.emailInput).type(registerData.randomEmail);
        cy.get(Locators.Register.passwordInput).type(registerData.password);
        cy.get(Locators.Register.passwordConfirmationInput).type(registerData.password);
        cy.get(Locators.Register.tosCheckbox).check();
        cy.get(Locators.Register.submitBtn).click();
        cy.url().should('include','/register');
    })

})