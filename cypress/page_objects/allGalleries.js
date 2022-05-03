class AllGalleries{
    get searchInput () {
        return cy.get('input[type="text"]');
    }
    get filterBtn () {
        return cy.get('button[class="btn btn-outline-secondary input-button"]');
    }
    get header () {
        return cy.get('h1[class="title-style"]');
    }
    get singleGallery () {
        return cy.get('a[class="box-title"]').eq(0);
    }
    get loadBtn () {
        return cy.get('button[class="btn btn-custom"]');
    }
    get someGallery () {
        return cy.get('a[class="box-title"]').eq(0);
    }
    get allGalleryDiv () {
        return cy.get('div[class="grid"]');
    }

}

export const allGalleries = new AllGalleries();