import { loginPage } from "../page_objects/loginPage"

describe ('login POM', () => {

    it('login with valid data', () => {
        cy.visit('/login')
        // loginPage.emailInput.type('romanabenin21@yahoo.com')
        // loginPage.passwordInput.type('romanica123')
        // loginPage.submitBtn.click();
        loginPage.login('romanabenin21@yahoo.com','romanica123')

    })

})