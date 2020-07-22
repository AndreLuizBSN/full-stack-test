'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */

const User = use("App/Models/User")
const Transformer = use('App/Transformers/Admin/UserTransformer')

class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   * @param {object} ctx.pagination
   */
  async index ({ request, response, transform, pagination }) {

    const name = request.input('name')

    const query = User.query()

    if ( name ) {
      query.where('name', 'LIKE', `%${name}%`)
      query.orWhere('surname', 'LIKE', `%${name}%`)
      query.orWhere('email', 'LIKE', `%${name}%`)
    }

    var users = await query.paginate( pagination.page, pagination.limit )

    users = await transform.paginate(users, Transformer)

    return response.send(users)
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, transform }) {
    
    try {
      
      const { name, surname, email, password } = request.all()

      if ( !name ) {
        response.status(400).send({
          message: "Nome do usuario precisa ser preenchido!"
        })  
      } else if ( !email ) { 
        response.status(400).send({
          message: "E-mail do usuario precisa ser preenchido!"
        })  
      } else if ( !password ) { 
        response.status(400).send({
          message: "Senha do usuario precisa ser preenchido!"
        })  
      } else {

        var user = await User.create( { name, surname, email, password })

        user = await transform.item(user, Transformer)

        return response.status(201).send(user)

      }

    } catch (error) {
      
      response.status(400).send({
        message: "Erro ao processar a sua solicitação!"
      })

    }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params: { id }, request, response, transform }) {
    var user = await User.findOrFail(id)
    user = await transform.item(user, Transformer)
    return response.send(user)
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async showDefatultUser ( { request, response, transform }) {
    const { email } = request.all();

    var user = await User.findByOrFail('email', `${email}`)

    user = await transform.item(user, Transformer)
    
    return response.send(user)
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params: { id }, request, response, transform }) {
    
    const data = await User.findOrFail(id)

    const { name, surname, email, password, image_id } = request.all()

    data.merge( { name, surname, email, password, image_id } )

    await data.save()

    var dataRet = await User.findOrFail(id)

    dataRet = await transform.item(dataRet, Transformer)

    return response.send(dataRet)
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params: { id }, request, response }) {
    const user = await User.findOrFail(id)

    try {
      
      await user.delete()
      return response.status(204).send()  

    } catch (error) {
      return response.status(404).send({
        message: "Não foi possível excluir o registro"
      })  
    }

    
  }
}

module.exports = UserController
