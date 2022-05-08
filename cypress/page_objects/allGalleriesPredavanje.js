/// <reference types="Cypress" />

class AllGalleries {
    get allGalleriesHeading() {
        return cy.get('h1');
    }

    get searchInput() {
        return cy.get('input');
    }

    get filterButton() {
        return cy.get('.btn').first();
    }

    get loadMoreButton() {
        return cy.get('.btn').last();
    }

    get singleGallery() {
        return cy.get('.cell');
    }

    search(searchTerm) {
        this.searchInput.type(searchTerm);
        this.filterButton.click();
    }
}

export const allGalleries = new AllGalleries();