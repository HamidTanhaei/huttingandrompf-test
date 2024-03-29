import {oneToOneJoinData} from '../../src/utils/joinRestData';
import {browserRoutes} from '../../src/consts/browserRoutes';
const startServer = () => {
  cy.server();
  cy.fixture('featuresTable/default.json').as('defaultData');
  cy.route('/api/authorization/rights_and_roles_elements?page[size]=10', '@defaultData');
}
describe('Page number Change', () => {
  it('Should fetch by change page number', () => {
    startServer();
    cy.fixture('featuresTable/page[number]=2.json').as('pageNumber2Data');
    cy.route('/api/authorization/rights_and_roles_elements?page[size]=10&page[number]=2', '@pageNumber2Data');

    cy.visit('/');
    cy.get('.features-table .ant-table-pagination .ant-pagination-item-2').click();
    cy.get('.features-table .ant-spin-nested-loading .ant-spin-spinning').should('not.exist');
    cy.wait(300);
    cy.get('@pageNumber2Data').then((data) => {
      cy.get('.features-table tbody tr:first-child td:last-child').invoke('text').then(text => {
        expect(oneToOneJoinData(data)[0]['element']['attributes']['label']).to.eq(text);
      });
    });
  });

  it('Should location changes by change page number', () => {
    cy.visit('/');
    cy.get('.features-table .ant-table-pagination .ant-pagination-item-2').click();
    cy.wait(300);
    cy.url().should('eq', Cypress.env('host') + browserRoutes.listing + '?page[number]=2');
  });

  it.only('Should fetch based on browser location', () => {
    cy.server();
    cy.fixture('featuresTable/page[number]=2.json').as('pageNumber2Data');
    cy.route('/api/authorization/rights_and_roles_elements?page[size]=10&page[number]=2', '@pageNumber2Data');

    cy.visit(Cypress.env('host') + browserRoutes.listing + '?page[number]=2');
    cy.get('.features-table .ant-spin-nested-loading .ant-spin-spinning').should('not.exist');
    cy.wait(300);
    cy.get('@pageNumber2Data').then((data) => {
      cy.get('.features-table tbody tr:first-child td:last-child').invoke('text').then((text => {
        expect(oneToOneJoinData(data)[0]['element']['attributes']['label']).to.eq(text);
      }));
    });
  });
});


describe('Sort Change', () => {
  it('Should fetch by sorted type (ascend)', () => {
    startServer();
    cy.fixture('featuresTable/sort_direction=asc.json').as('sortDirectionAscData');
    cy.route('/api/authorization/rights_and_roles_elements?page[size]=10&page[number]=1&sort_type=label&sort_direction=asc', '@sortDirectionAscData');

    cy.visit('/');
    cy.get('.features-table thead tr:first-child th:last-child .ant-table-column-sorter div[title=Sort]').click();
    cy.get('.features-table .ant-spin-nested-loading .ant-spin-spinning').should('not.exist');
    cy.wait(300);
    cy.get('@sortDirectionAscData').then((data) => {
      cy.get('.features-table tbody tr:first-child td:last-child').invoke('text').then((text => {
        expect(oneToOneJoinData(data)[0]['element']['attributes']['label']).to.eq(text);
      }));
    });
  });

  it('Should fetch by sorted type (descend)', () => {
    startServer();

    cy.fixture('featuresTable/sort_direction=asc.json').as('sortDirectionAscData');
    cy.route('/api/authorization/rights_and_roles_elements?page[size]=10&page[number]=1&sort_type=label&sort_direction=asc', '@sortDirectionAscData');
    cy.fixture('featuresTable/sort_direction=desc.json').as('sortDirectionDescData');
    cy.route('/api/authorization/rights_and_roles_elements?page[size]=10&page[number]=1&sort_type=label&sort_direction=desc', '@sortDirectionDescData');

    cy.visit('/');
    cy.get('.features-table thead tr:first-child th:last-child .ant-table-column-sorter div[title=Sort]').click();
    cy.get('.features-table .ant-spin-nested-loading .ant-spin-spinning').should('not.exist');
    cy.wait(300);

    cy.get('.features-table thead tr:first-child th:last-child .ant-table-column-sorter div[title=Sort]').click();
    cy.get('.features-table .ant-spin-nested-loading .ant-spin-spinning').should('not.exist');
    cy.wait(300);

    cy.get('@sortDirectionDescData').then((data) => {
      cy.get('.features-table tbody tr:first-child td:last-child').invoke('text').then((text => {
        expect(oneToOneJoinData(data)[0]['element']['attributes']['label']).to.eq(text);
      }));
    });
  });

  it('Should location changes by change sort', () => {
    cy.visit('/');
    cy.get('.features-table thead tr:first-child th:last-child .ant-table-column-sorter div[title=Sort]').click();
    cy.wait(300);
    cy.url().should('eq', Cypress.env('host') + browserRoutes.listing + '?page[number]=1&sort_type=label&sort_direction=asc');

    cy.get('.features-table thead tr:first-child th:last-child .ant-table-column-sorter div[title=Sort]').click();
    cy.wait(300);
    cy.url().should('eq', Cypress.env('host') + browserRoutes.listing + '?page[number]=1&sort_type=label&sort_direction=desc');

    cy.get('.features-table thead tr:first-child th:last-child .ant-table-column-sorter div[title=Sort]').click();
    cy.wait(300);
    cy.url().should('eq', Cypress.env('host') + browserRoutes.listing + '?page[number]=1');
  });

  it('Should fetch based on browser location', () => {
    cy.server();
    cy.fixture('featuresTable/sort_direction=asc.json').as('sortDirectionAscData');
    cy.route('/api/authorization/rights_and_roles_elements?page[size]=10&page[number]=1&sort_type=label&sort_direction=asc', '@sortDirectionAscData');

    cy.visit(Cypress.env('host') + browserRoutes.listing + '?page[number]=1&sort_type=label&sort_direction=asc');
    cy.get('.features-table .ant-spin-nested-loading .ant-spin-spinning').should('not.exist');
    cy.wait(300);
    cy.get('@sortDirectionAscData').then((data) => {
      cy.get('.features-table tbody tr:first-child td:last-child').invoke('text').then((text => {
        expect(oneToOneJoinData(data)[0]['element']['attributes']['label']).to.eq(text);
      }));
    });
  });
});
