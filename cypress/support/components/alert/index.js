import { el } from './elements'

class Alert {

    HaveText(expectedText){
        cy.contains(el.Error, expectedText)
            .should('be.visible')
    }

}

export default new Alert()

