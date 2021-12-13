// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

//USER CREATION
Cypress.Commands.add('createUser', (userData) => {
  cy.get(':nth-child(2) > .dropdown-toggle').click()
  cy.get('div.not-logged > :nth-child(1) > .open > .dropdown-menu > :nth-child(3) > a').click()
  cy.get('#email').type(userData.email)
  cy.get('#getstarted > .button').click()
  cy.wait(1000)
  cy.get('#myModal > .modal-header').should('be.visible')
  cy.get('#user_first_name').type(userData.name)
  cy.get('#user_last_name').type(userData.last_name)
  cy.get('#user_password').type(userData.password)
  cy.get('#user_password_confirmation').type(userData.password)
  cy.get('#user_phone').type(userData.phone)
  cy.get('#user_company').type(userData.company)
  cy.get('#user_license').type(userData.license)
  cy.get('.actions > .button').click()
  cy.wait(1000)
})

Cypress.Commands.add('createEvUser', (userEvData) => {
  cy.get('[href="/guests"] > .forgot_link_black').should('be.visible')
  cy.get('[href="/guests"] > .forgot_link_black').click()
  cy.wait(2000)
  cy.get('.user_first_name').should('be.visible')
  cy.get('#user_first_name').type(userEvData.ev_name)
  cy.get('.user_last_name').should('be.visible')
  cy.get('#user_last_name').type(userEvData.ev_last_name)
  cy.get('.user_email').should('be.visible')
  cy.get('#user_email').type(userEvData.ev_email)
  cy.get('.user_password').should('be.visible')
  cy.get('.user_password').type(userEvData.password)
  cy.get('#btn-create-account').should('be.visible')
  cy.get('#btn-create-account').click()
})

//LOGIN USERS
Cypress.Commands.add('loginUser', (username, password) => {
  cy.get('#user_email').type(username)
  cy.get('#user_password').type(password)
  cy.get('.check-text').click()
  cy.get('.form-controls > .button').click()
  cy.wait(1000)
})

Cypress.Commands.add('loginEvUser', (username, password) => {
  cy.get('.user_email').should('be.visible')
  cy.get('#user_email').type(username)
  cy.get('.user_password').should('be.visible')
  cy.get('#user_password').type(password)
  cy.get('.primary-button').should('be.visible')
  cy.get('.primary-button').click()
  cy.wait(3000)
})

Cypress.Commands.add('loginFolioUser', (username, password) => {
  cy.get('#user_email').type(username)
  cy.get('#user_password').type(password)
  cy.get(':nth-child(3) > .col-xs-12 > .button').click()
  cy.wait(1000)
})

//FORCE DOMAIN
Cypress.Commands.add('forceVisit', url => {
    cy.window().then(win => {
        return win.open(url, '_self');
      });
});
