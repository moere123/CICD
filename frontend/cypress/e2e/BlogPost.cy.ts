import post from '../fixtures/post.json';

describe('BlogPost Tests', () => {
    before(() => {
        cy.login();
    })

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    afterEach(() => {
        cy.saveLocalStorage();
    });

    it('Create New BlogPost', () => {
        cy.getElement("header-create-post").click();
        cy.getElement("createPost-title").type(post.title);
        cy.getElement("createPost-text").type(post.text);
        cy.getElement("createPost-category").type(post.category);
        cy.getElement("createPost-submit").click();

        cy.getElement(post.title, false);
    });

    it('Edit BlogPost', () => {
        cy.getElement(post.title + "-edit", false).first().click();
        cy.getElement("editPost-title").type(post.newTitle);
        cy.getElement("editPost-text").type(post.text);
        cy.getElement("editPost-category").type(post.category);
        cy.getElement("editPost-submit").click();

        cy.getElement(post.title + post.newTitle, false);
    });

    it('Delete BlogPost', () => {
        let amount = cy.getElement(post.title + post.newTitle, false).length;

        cy.getElement(post.title + post.newTitle + "-delete", false).first().click();

        if (amount > 0) {
            cy.getElement(post.title + post.newTitle, false).should('have.length', amount - 1);
        }
    })
})