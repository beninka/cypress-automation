class CreateGallery {

    get titleInput () {
        return cy.get('#title');
    }
    get descriptionsInput () {
        return cy.get('#description');
    }
    get imagesInput () {
        return cy.get('input[placeholder="image url"]');
    }
    get addImageBtn () {
        return cy.get('button[type="button"]').contains('Add image');
    }
    get submitBtn () {
        return cy.get('button[type="submit"]').contains('Submit');
    }
    get cancelBtn () {
        return cy.get('button[type="submit"]').contains('Cancel');
    }
    
    create(title, description, imageUrl) {
        this.titleInput.type(title);
        this.descriptionsInput.type(description);
        this.imagesInput.type(imageUrl);
        this.submitBtn.click();
    }
    createMorePic(title, description, imageUrl, secondImageUrl) {
        this.titleInput.type(title);
        this.descriptionsInput.type(description);
        this.imagesInput.eq(0).type(imageUrl);
        this.addImageBtn.click();
        this.imagesInput.eq(1).type(secondImageUrl);
        this.submitBtn.click();

    }
}

export const createGallery = new CreateGallery();