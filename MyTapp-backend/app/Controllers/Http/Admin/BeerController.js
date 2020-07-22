'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with beers
 */

const BeerExtService = use('App/Services/Beer/BeerExtService')

class BeerController {
  /**
   * Show a list of all beers.
   * GET beers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   * @param {object} ctx.pagination
   */
  async index ({ request, response }) {

    const req = request.all();

    const service = new BeerExtService();
    const dados = await service.getData(req);

    if ( dados.statusCode ) {
      return response.status(dados.statusCode).send(dados)
    }

    return response.send(dados)

  }
  /**
   * Display a single beer.
   * GET beers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params: { id }, request, response, transform }) {

    const service = new BeerExtService();
    const dados = await service.getData(null, id);

    if ( dados.statusCode ) {
      return response.status(dados.statusCode).send(dados)
    }

    return response.send(dados)
    
  }
}

module.exports = BeerController
