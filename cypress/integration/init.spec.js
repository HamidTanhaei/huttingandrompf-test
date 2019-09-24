console.log(process.env);
it('visits the app', () => {
    Cypress.LocalStorage.clear = function(keys, ls, rs){};
  cy.visit('/');
});
it('visits the app', () => {
  const email = 'buyo@maillist.in';
  cy.get('input[type=email]')
    .type(email)
    .should('have.value', email);

  const password = 'girnade123!';
  cy.get('input[type=password]')
    .type(password)
    .should('have.value', password);

  cy.get('button[type=submit]').click();
  cy.wait(3000);

  cy.url().should('eq', 'http://immersion.smart/campaign');
});

