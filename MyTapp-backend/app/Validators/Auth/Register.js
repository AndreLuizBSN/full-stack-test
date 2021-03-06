'use strict'

class AuthRegister {
  get rules () {
    return {
      name: 'required', 
      surname: 'required', 
      email: 'required|email|unique:users,email', 
      password: 'required|confirmed'
    }
  }

  get messages() {
    return {
      'name.required': 'O nome é obrigatório',
      'surname.required': 'O sobrenome é obrigatório', 
      'email.required': 'O E-mail é obrigatório',
      'email.email': 'O E-mail é inválido',
      'email.unique': 'Esse E-mail já está cadastrado',
      'password.required': 'A senha é obrigatória',
      'password.confirmed' : 'As senhas não são iguais'
      
    }
  }
}

module.exports = AuthRegister
