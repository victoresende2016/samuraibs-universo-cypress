
import dashPage from '../support/pages/dash'

import {customer, provider, appointment} from '../support/factories/dash'


describe('dashboard', () => {
    context('quando o cliente faz um agendamento no app mobile', () => {
        
        before(() => {
            cy.postUser(provider)
            cy.postUser(customer)
            cy.apiLogin(customer)
            cy.setProviderId(provider.email)
            cy.createAppointment(appointment.hour)
        })

        it('o mesmo dever ser exibido no dashboard', () => {
            const date = Cypress.env('appointmentDate')
            //cy.uiLogin(provider)
            cy.apiLogin(provider, true)
            dashPage.calendarShouldBeVisible()
            dashPage.selectDay(date)
            dashPage.appointmentShouldBe(customer,appointment.hour)



        })
    })

})
