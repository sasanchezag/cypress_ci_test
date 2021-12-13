describe('Loging process', () => {
  before(() => {
    cy.clearLocalStorage()
    cy.clearCookies()
  })

  beforeEach(() => {
    cy.fixture('user.json').as('userData')
  })

//BEFORE LOGING WE NEED TO REGISTER AN USER, WE SKIP THIS TEST BECASUE OF AN OPEN ISSUE REGARDING CLEAR COOKIES
  it.skip('should register an user', () => {
    // cy.request('/connect?url=folioUrl')
    cy.get('@userData').then((userData) => {
      cy.createUser(userData)
    })
  })

//BEFORE LOGING WE NEED TO ASK IF IS AN EXISTING USER
  it('should ask if is an existing user', () => {
    cy.visit('/')
    cy.request('http://localhost:3000/connect?url=http://douglas-elliman-dev.com:3000/')

    cy.get('@userData').then((userData) => {
      cy.get(':nth-child(2) > .dropdown-toggle').click()
      cy.get('div.not-logged > :nth-child(1) > .open > .dropdown-menu > :nth-child(3) > a').click()
      cy.get('#email').type(userData.email)
      cy.get('#getstarted > .button').click()
      cy.wait(1000)
      cy.get('#myModal > .modal-header > #myModalLabel').should('be.visible')
      cy.get('.login-link > a').should('be.visible')
      cy.get('.login-link > a').click()
      cy.wait(1000)
    })
  })

//LOGUED A USER
  it('should logged a user', () => {
    cy.visit('users/sign_in')
    cy.get('h1').should('have.length',1);
    cy.get('@userData').then((userData) => {
      cy.loginUser(userData.email, userData.password)
    cy.wait(1000)
    })
  })

  after(() => {
    cy.clearLocalStorage()
  })
})
