
import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'


describe('login', function () {
    context('quando o usuário é muito bom', function () {
        const user = {
            name: 'huck',
            email: 'huck@gmail.com',
            password: 'a123456',
            is_provider: true
        }

        before(function () {
            cy.postUser(user)
        })

        it('deve logar com sucesso', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            dashPage.header.userLoggedIn(user.name)
        })
    })
})