import signupPage from '../support/pages/signup'

describe('Cadastro', function () {

    context('quando o usuário é novato', function () {
        const user = {
            name: 'Victor Resende',
            email: 'victor@gmail.com',
            password: 'goy8918',
            is_provider: true
        }
        before(function () {
            cy.postUser(user)
        })
        it('Deve Cadastrar com sucesso', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toastHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
          
        })

    })


    context('quando o email já existe', function () {
        const user = {
            name: 'Victor Resende',
            email: 'victor@gmail.com',
            password: 'goy8918',
            is_provider: true
        }
        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then(function (response) {
                expect(response.status).to.eq(200)
            })

        })
        it('não deve cadastrar o usuário', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toastHaveText('Email já cadastrado para outro usuário.')
        })
    })

    context('quando o email é incorreto',function(){
        const user = {
            name: 'Elizabeth Olsen',
            email: 'liza.yahoo.com',
            password: 'pwd123'
        }   
        it('deve exibir mensagem de alerta',function(){
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alertHaveText('Informe um email válido')
        })
    })

    context('quando a senha é muito curta',function(){
        const passwords = ['1','2a','ab3','abc4','ab#c5']
        beforeEach(function(){
            signupPage.go()
        })
        passwords.forEach(function(p){
            it('não deve cadastrar com a senha: '+ p, function(){
                const user = {name: 'jason Friday', email: 'jason@gmail.com',password: p}
                signupPage.form(user)
                signupPage.submit()
            })
        })
        afterEach(function(){
            signupPage.alertHaveText('Pelo menos 6 caracteres')
        })
    })

    context('quando não preencho nenhum dos campos',function(){
        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]
        before(function(){
            signupPage.go()
            signupPage.submit()            
        })

        alertMessages.forEach(function(alert){
            it('deve exibir '+ alert.toLowerCase(), function(){
                signupPage.alertHaveText(alert)
            })
        })
    })

})
