import loginData from '../fixtures/login.json';

let LOCAL_STORAGE_MEMORY: { [key: string]: string } = {};

Cypress.Commands.addAll({
    saveLocalStorage: () =>
        Object.keys(localStorage).forEach(
            (key: string) => (LOCAL_STORAGE_MEMORY[key] = localStorage[key])
    ),

    restoreLocalStorage: () =>
        Object.keys(LOCAL_STORAGE_MEMORY).forEach((key: string) =>
            localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key])
    ),

    login: (email: string = loginData.email, password: string = loginData.password) => {
        cy.visit("/login");
    
        cy.getElement("login-email").type(email);
        cy.getElement("login-password").type(password);
        cy.getElement("login-button").click();
    
        return cy.wait(500);
      },

      getElement: (dataCY: string, shouldBeVisible = true) => {
        const element = cy.get(`[data-cy="${dataCY}"]`);
    
        if (shouldBeVisible) element.scrollIntoView().should("be.visible");
    
        return element;
      },
})