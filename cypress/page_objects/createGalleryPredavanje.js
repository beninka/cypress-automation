class CreateGallery {
    get titleInput() {
        return cy.get('#title')
    }

    get descriptionInput() {
        return cy.get('#description')
    }

    get imageUrlInput() {
        return cy.get('.input-group');
    }

    get addImageBtn() {
        return cy.get('button[type="button"]').last()
    }

    get submitBtn() {
        return cy.get('.btn').first();
    }

    get imageInputParent() {
        return cy.get('.input-group');
    }

    createGallery(title, description, image) {
        console.log('URL', image)
        this.titleInput.type(title)
        this.descriptionInput.type(description)
        this.imageUrlInput.type(image);
        this.addImageBtn.click();
        this.imageInputParent.last().find('button');
        // this.submitBtn.click();
    }
}

export const createGallery = new CreateGallery();