/// <reference types="cypress" />

import contratoUsuarios from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {

     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then(response => {
               return contratoUsuarios.validateAsync(response.body)
          })
     });

     it('Deve listar usuários cadastrados', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios'
          }).then((response) => {
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('usuarios')
               expect(response.body).to.have.property('quantidade')
               expect(response.duration).to.be.lessThan(25)
          });
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          let email = `emaildecadastro${Math.floor(Math.random() * 10000)}@qa.com.br`

          cy.request({
               method: 'POST',
               url: 'usuarios',
               body: {
                    "nome": "João Maria",
                    "email": email,
                    "password": "testeEe",
                    "administrador": "false"
               },
          }).then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal("Cadastro realizado com sucesso")
          });
     });

     it('Deve validar um usuário com email inválido', () => {
          let email = `emaildecadastro${Math.floor(Math.random() * 10000)}@qa.com.br`

          cy.cadastrarUsuario(email).then((response) => {
               expect(response.status).to.equal(201)
          })

          cy.cadastrarUsuario(email).then((response) => {
               expect(response.status).to.equal(400)
               expect(response.body.message).to.equal("Este email já está sendo usado")
          })
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          let email = `emaildecadastro${Math.floor(Math.random() * 10000)}@qa.com.br`

          cy.cadastrarUsuario(email).then((response) => {
               expect(response.status).to.equal(201)

               let idDoUsuario = response.body._id
               cy.request({
                    method: 'PUT',
                    url: `usuarios/${idDoUsuario}`,
                    body: {
                         "nome": "João Maria Editado",
                         "email": email,
                         "password": "test",
                         "administrador": "true"
                    }
               }).then((response) => {
                    expect(response.status).to.equal(200)
                    expect(response.body.message).to.equal("Registro alterado com sucesso")
               });
          });
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          let email = `emaildecadastro${Math.floor(Math.random() * 10000)}@qa.com.br`

          cy.cadastrarUsuario(email).then((response) => {
               expect(response.status).to.equal(201)

               let idDoUsuario = response.body._id
               cy.request({
                    method: 'DELETE',
                    url: `usuarios/${idDoUsuario}`,
                    failOnStatusCode: false
               }).then((response) => {
                    expect(response.status).to.equal(200)
                    expect(response.body.message).to.equal("Registro excluído com sucesso")
               });
          });
     });
});
