describe('works well', () => {
    it('shows all farms', () => {
        cy.visit('http://localhost:3000');

        cy.get('input').type('testid1');

        cy.get('button').click();

        cy.get('div').contains('기온').click();

        cy.get('p').contains('기온').should('exist');

        cy.get('option').contains('농장 리스트').should('exist');
    });
});
