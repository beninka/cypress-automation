/// <reference types="Cypress" />

import { loginPage } from "../page_objects/loginPage";
import { createGallery } from "../page_objects/createGallery";
import { faker } from '@faker-js/faker';

describe('Create Gallery POM', () => {

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
        createGallery.submitBtn.click()
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
    })

    it('05 - Cancel create gallery', () => {
        cy.visit('/create');
        cy.url().should('include','/create');
        createGallery.cancelBtn.click()
        cy.url().should('include','/');
    })
  
    it('06 - Create gallery without description - successfull', () => {
        cy.visit('/create');
        cy.url().should('include','/create');
        createGallery.create(
            galleryData.title,
            " ",
            galleryData.imageUrl
        );
        cy.url().should('not.include','/create');
    })

    it('07 - Create gallery with valid data - successfull', () => {
        cy.visit('/create');
        cy.url().should('include','/create');
        createGallery.create(
            galleryData.title,
            galleryData.description,
            galleryData.imageUrl
        );
        cy.url().should('not.include','/create');
    })

    it('08 - Create gallery with more pictures - successfull', () => {
        cy.visit('/create')
        cy.url().should('include','/create');
        createGallery.createMorePic(
            galleryData.title,
            galleryData.description,
            galleryData.imageUrl,
            galleryData.secondImageUrl
        );
        cy.url().should('not.include','/create');  
    })

})