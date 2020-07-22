'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

    Route.resource('users', 'UserController').apiOnly()
        .validator(new Map([
            [['users.store'], ['Admin/StoreUser']],
            [['users.update'], ['Admin/StoreUser']]
        ]))
    
    Route.get('beers', 'BeerController.index')
    Route.get('beers/:id', 'BeerController.show')

}).prefix('v1').namespace('Admin')
.middleware(['auth'])
