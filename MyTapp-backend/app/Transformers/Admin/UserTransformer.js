'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * UserTransformer class
 *
 * @class UserTransformer
 * @constructor
 */
class UserTransformer extends BumblebeeTransformer {
  
  transform (model) {
    return {
      id: model.id,
      name: model.name,
      surname: model.surname,
      email: model.email,
      active: model.active,
      created_at: model.created_at,
      updated_at: model.updated_at
    }
  }

}

module.exports = UserTransformer
