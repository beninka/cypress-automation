class LoginPage {

    get emailInput () {
       return cy.get('#email');
    }

    get passwordInput () {
      return  cy.get('#password');
    }

    get submitBtn () {
       return cy.get('button[type="submit"]');
    }

    get loginHeading () {
      return cy.get('h1');
  }
  get errorMsg()  {
    return cy.get ('p[class="alert alert-danger"]');
}

    login (email, password) {
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.submitBtn.click();
    }
}

export const loginPage = new LoginPage();