'use strict'

const Transformer = use('App/Transformers/Admin/UserTransformer')

class UserController {

    async me( { response, transform, auth } ) {
        var user = await auth.getUser()
        const userData = await transform.item(user, Transformer)
        return response.send(userData)
    }

}

module.exports = UserController
