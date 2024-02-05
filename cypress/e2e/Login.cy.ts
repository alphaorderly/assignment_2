describe('Login', () => {
    it('passes', () => {
        cy.visit('http://localhost:3000');

        cy.get('input').type('testid1');

        cy.get('button').click();

        cy.get('p').contains('님의 스마트팜').should('exist');
    });
});
