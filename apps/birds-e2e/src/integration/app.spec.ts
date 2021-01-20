import { getToolbarAppName } from '../support/app.po';

describe('birds', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.route2('GET', '/api/auth', { fixture: 'auth.json' });
    cy.route2('GET', '/api/pets?type=Bird', { fixture: 'pets.json' });
  });

  it('should contain app name in toolbar', () => {
    getToolbarAppName().contains('Birds');
  });
});
