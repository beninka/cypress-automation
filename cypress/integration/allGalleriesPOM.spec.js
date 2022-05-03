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
        allGalleries.singleGallery.click();
        cy.url().should('include', '/galleries');
    })

    it('03 - Click load more button', () => {
        allGalleries.loadBtn.click();
        allGalleries.allGalleryDiv.find('.cell').should('have.length',20);
    })

    it('04 - Search gallery', () => {
        allGalleries.searchInput.type('molestiae');
        allGalleries.filterBtn.click();
        allGalleries.someGallery.should('be.visible');
    })

})