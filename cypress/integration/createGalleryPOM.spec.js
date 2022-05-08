/// <reference types="Cypress" />

import { loginPage } from "../page_objects/loginPage";
import { createGallery } from "../page_objects/createGallery";
import { faker } from '@faker-js/faker';

describe('Create Gallery POM', () => {

    let galleryId;

    let galleryData = {
        title:faker.lorem.word(),
        description:faker.lorem.slug(),
        imageUrl:faker.image.avatar(),
        secondImageUrl:faker.image.avatar()
    }

    beforeEach('Visit login page',() => {
        cy.visit('/login');
        loginPage.login('romanabenin21@yahoo.com','romanica123');
        cy.url().should('not.include', '/login');
    })

    it('01 - Create gallery with all fields empty - negative', () => {
        cy.visit('/create');
        cy.url().should('include','/create');
        createGallery.submitBtn.click();
        cy.url().should('include','/create');

    })

    it('02 - Create gallery with only title filled - negative', () => {
        cy.visit('/create');
        cy.url().should('include','/create');
        createGallery.create(
            galleryData.title,
            " ",
            " "
        );

        cy.url().should('include','/create');

    })

    it('03 - Create gallery without images field - negative', () => {
        cy.visit('/create');
        cy.url().should('include','/create');
        createGallery.create(
            galleryData.title,
            galleryData.description,
            " "
        );

        cy.url().should('include','/create');
        createGallery.imagesInput.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.');
        })

    })

    it('04 - Create gallery with invalid url - negative', () => {
        cy.visit('/create');
        cy.url().should('include','/create');
        createGallery.create(
            galleryData.title,
            galleryData.description,
            faker.commerce.color()
        );

        cy.url().should('include','/create');
        createGallery.imagesInput.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please enter a URL.');
        })

    })

    it('05 - Cancel create gallery', () => {
        cy.intercept({
            method: 'GET',
            url: 'https://gallery-api.vivifyideas.com/api/galleries?page=1&term='
        }).as('allGalleries');

        cy.visit('/create');
        cy.url().should('include','/create');
        createGallery.cancelBtn.click();

        cy.wait('@allGalleries').then(interception=> {
            console.log('RESPONSE', interception);
            expect(interception.response.statusCode).eq(200);
        })

        cy.url().should('include','/');

    })
  
    it('06 - Create gallery without description - successfull', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('successfullCreate');

        cy.visit('/create');
        cy.url().should('include','/create');
        createGallery.create(
            galleryData.title,
            " ",
            galleryData.imageUrl
        );

        cy.wait('@successfullCreate').then(interception=> {
            console.log('RESPONSE', interception);
            expect(interception.response.statusCode).eq(201);
            expect(interception.response.statusMessage).eq('Created');
        })

        cy.url().should('not.include','/create');
    })

    it('07 - Create gallery with valid data - successfull', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('successfullCreate');

        cy.visit('/create');
        cy.url().should('include','/create');
        createGallery.createHeading.should('have.text', 'Create Gallery');

        createGallery.create(
            galleryData.title,
            galleryData.description,
            galleryData.imageUrl
        );

        cy.wait('@successfullCreate').then(interception=> {
            console.log('RESPONSE', interception);
            expect(interception.response.statusCode).eq(201);
            expect(interception.response.statusMessage).eq('Created');
            galleryId = interception.response.body.id;
        })

        cy.url().should('not.include','/create');
    })

    it('08 - Edit gallery', () =>{
        cy.intercept({
            method: 'PUT',
            url: `https://gallery-api.vivifyideas.com/api/galleries/${galleryId}`
        }).as('successfullEdit');


        cy.visit(`edit-gallery/${galleryId}`)
        createGallery.create(
            faker.name.jobTitle(),
            faker.animal.cat(),
            faker.image.avatar()
        );

        cy.wait('@successfullEdit').then(interception=> {
            console.log('RESPONSE', interception);
            expect(interception.response.statusCode).eq(200);
        })

    })

    it('09 - Create gallery with more pictures - successfull', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('successfullCreate');

        cy.visit('/create');
        cy.url().should('include','/create');
        createGallery.createMorePic(
            galleryData.title,
            galleryData.description,
            galleryData.imageUrl,
            galleryData.secondImageUrl
        );

        cy.wait('@successfullCreate').then(interception=> {
            console.log('RESPONSE', interception);
            expect(interception.response.statusCode).eq(201);
            expect(interception.response.statusMessage).eq('Created');
        })

        cy.url().should('not.include','/create');  

    })

})