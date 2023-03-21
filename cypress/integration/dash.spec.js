import loginPage from '../support/pages/login'

describe('dashboard', () => {
    context('quando o cliente faz um agendamento no app mobile', () => {
        const data = {
            customer: {
                name: 'Nikki Sixx',
                email: 'sixx@motleycrue.com',
                password: 'pwd123',
                is_provider: false
            },
            provider: {
                name: 'Ramon Valdes',
                email: 'ramon@televisa.com',
                password: 'pwd123',
                is_provider: true
            }
        }
        before(() => {
            cy.postUser(data.provider)
            cy.postUser(data.customer)


            cy.apiLogin(data.customer)
            cy.log('Conseguimos pegar o token ' + Cypress.env('apiToken'))

            cy.setProviderId(data.provider.email)
            cy.createAppointment()
        })

        it('o mesmo dever ser exibido no dashboard', () => {

            loginPage.go()
            loginPage.form(data.provider)
            loginPage.submit()

            cy.wait(3000)



        })
    })

})
import moment from 'moment'

Cypress.Commands.add('createAppointment', () => {
    let now = new Date()
    now.setDate(now.getDate() + 1)
    const date = moment(now).format('YYYY-MM-DD 14:00:00')

    const payload = {
        provider_id: Cypress.env('providerId'),
        date: date
    }
    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/appointments',
        body: payload,
        headers: {
            authorization: 'Bearer ' + Cypress.env('apiToken')
        }
    }).then(function (response) {
        expect(response.status).to.eq(200)

    })



})


Cypress.Commands.add('apiLogin', function (user) {

    const payload = {
        email: user.email,
        password: user.password
    }

    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/sessions',
        body: payload
    }).then(function (response) {
        expect(response.status).to.eq(200)
        Cypress.env('apiToken', response.body.token)
    })
})


Cypress.Commands.add('setProviderId', function (providerEmail) {

    cy.request({
        method: 'GET',
        url: 'http://localhost:3333/providers',
        headers: {
            authorization: 'Bearer ' + Cypress.env('apiToken')
        }
    }).then(function (response) {
        expect(response.status).to.eq(200)
        console.log(response.body)

        const providerList = response.body

        providerList.forEach(function (provider) {
            if (provider.email === providerEmail) {

                Cypress.env('providerId', provider.id)
            }
        })
    })
})