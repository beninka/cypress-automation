/// <reference types="Cypress" />

import { allGalleries } from '../page_objects/allGalleriesPredavanje';

describe('All Galleries test', () => {

        beforeEach('Visit all galleries page', () => {
            cy.loginViaBackend()
            cy.visit('/')
        })

        it('01 - Validate page', () => {
            cy.visit('/');
            // allGalleries.allGalleriesHeading
            //     .should('be.visible')
            //     .and('have.text', "All Galleries")
        })

        it('02 - All galleries displaying', () => {
            allGalleries.singleGallery
                .should('be.visible')
                .and('have.length', 10)
        })

        it('03 - 10 more galleries loading', () => {
            allGalleries.singleGallery.should('have.length', 10);
            allGalleries.loadMoreButton.click();
            allGalleries.singleGallery.should('have.length', 20);
            allGalleries.loadMoreButton.click();
            allGalleries.singleGallery.should('have.length', 30);
            allGalleries.loadMoreButton.click();
            allGalleries.singleGallery.should('have.length', 40);
        })

        it('04 - Redirect to single gallery page', () => {
            allGalleries.singleGallery
                .first()
                .find('a')
                .first()
                .click();
            cy.url().should('include', '/galleries')
        })

        it('05 - Redirect to authors\' gallery page', () => {
            allGalleries.singleGallery
                .first()
                .find('a')
                .last()
                .click();
            cy.url().should('include', '/authors')
        })

        it('06 - Search returning correct results', () => {
            let searchTerm = 'Product Security Architect'

            allGalleries.singleGallery.should('have.length', 10)
            allGalleries.search(searchTerm);
            allGalleries.singleGallery.should('have.length', 1);
            allGalleries.singleGallery
                .find('a')
                .first()
                .should('contain.text', searchTerm)
        });
});