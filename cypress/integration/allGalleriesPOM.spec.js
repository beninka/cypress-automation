/// <reference types="Cypress" />

import { loginPage } from "../page_objects/loginPage";
import { allGalleries } from "../page_objects/allGalleries";

describe('All Galleries POM', () => {

    beforeEach('Visit login page',() => {
        cy.visit('/login');
        loginPage.login('romanabenin21@yahoo.com','romanica123');
        cy.url().should('not.include', '/login');
    })

    it('01 - Validate all galleries page', () => {
        allGalleries.header.should('be.visible').and('have.text','All Galleries');
        allGalleries.searchInput.should('be.visible');
        allGalleries.filterBtn.should('be.visible').and('have.text','Filter');
        allGalleries.loadBtn.should('be.visible').and('have.text', 'Load More');
    })

    it('02 - Open single galllery', () => {
        cy.intercept({
            method: 'GET',
            url: 'https://gallery-api.vivifyideas.com/api/galleries/*'
        }).as('singleGallery');

        allGalleries.singleGallery.click();

        cy.wait('@singleGallery').then(interception=> {
            console.log('RESPONSE', interception);
            expect(interception.response.statusCode).eq(200);
        })

        cy.url().should('include', '/galleries');
    })

    it('03 - Click load more button', () => {
        cy.intercept({
            method: 'GET',
            url: 'https://gallery-api.vivifyideas.com/api/galleries?page=2&term='
        }).as('loadPage');

        allGalleries.loadBtn.click();
        allGalleries.allGalleryDiv.find('.cell').should('have.length',20);

        cy.wait('@loadPage').then(interception=> {
            console.log('RESPONSE', interception);
            expect(interception.response.statusCode).eq(200);
        })

    })

    it('04 - Search gallery', () => {
        cy.intercept({
            method: 'GET',
            url: 'https://gallery-api.vivifyideas.com/api/galleries?page=1&term=molestiae'
        }).as('searchGallery');

        allGalleries.searchInput.type('molestiae');
        allGalleries.filterBtn.click();
        allGalleries.someGallery.should('be.visible');

        cy.wait('@searchGallery').then(interception=> {
            console.log('RESPONSE', interception);
            expect(interception.response.statusCode).eq(200);
        })

    })

})
