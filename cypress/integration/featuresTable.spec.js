import {oneToOneJoinData} from '../../src/utils/joinRestData';

describe('Page number Change', () => {

  it('Should fetch by change page number', () => {
    cy.visit('/');

    cy.get('.features-table .ant-table-pagination .ant-pagination-item-2').click();

    cy.get('.features-table .ant-spin-nested-loading .ant-spin-spinning').should('not.exist' );

    cy.wait(300);

    cy.get('.features-table tbody tr:first-child td:last-child').invoke('text').then((text => {
      cy.request({
        url: Cypress.env('api_server') + '/rights_and_roles_elements',
        qs: {
          'page[size]': 10,
          'page[number]': 2
        }
      }).then((response) => {
        Cypress.log(response);
        expect(response.status).to.eq(200);
        expect(oneToOneJoinData(response.body)[0]['element']['attributes']['label']).to.eq(text);
      });
    }));
  });
});
