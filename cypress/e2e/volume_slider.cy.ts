describe('volume control', () => {
  it('click speaker icon -> slider visible & draggable', () => {
    cy.visit('/')
    cy.get('button').contains('svg').first().click()
    cy.get('[aria-expanded="true"] .h-24').should('be.visible')
    cy.get('[aria-expanded="true"] .h-24').trigger('mousedown', { clientY: 0 })
  })
})
