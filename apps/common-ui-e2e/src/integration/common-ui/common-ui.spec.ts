describe('common-ui: CommonUi component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=commonui--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to common-ui!');
    });
});
