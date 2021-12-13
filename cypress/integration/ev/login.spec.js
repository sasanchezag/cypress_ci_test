describe('Loging process', () => {
  before(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
  })

  beforeEach(() => {
    cy.fixture('user.json').as('userEvData')
  })

//LOGUED A USER
  it('should logged a user', () => {
    let url = Cypress.config().evUrl;
    cy.visit(url)
    // cy.visit('https://ev.pxs-staging.com/login')
    cy.get('.iubenda-cs-rationale').should('be.visible')
    cy.get('.iubenda-cs-accept-btn').click()
    cy.get('#top-menu > :nth-child(2) > a').click()
    cy.get('.title-ev-login').should('have.length',1);
    cy.get('@userEvData').then((userEvData) => {
      cy.loginEvUser(userEvData.ev_email, userEvData.password)
    cy.wait(3000)
    })
  })

  after(() => {
    cy.clearLocalStorage()
  })
})
