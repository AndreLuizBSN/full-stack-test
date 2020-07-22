'use strict'

const axios  = use('axios')

class BeerExtService {

    async getData(filter, id) {

        var strUrl = '';

        if ( id ) {
            strUrl = '/' + id
        } else {
            if ( Object.keys(filter).length !== 0 ) {
                var keys  = Object.keys(filter);

                keys.forEach(k => {
                    if ( strUrl == '' ) {
                        strUrl += '?' + k + '=' + filter[k];
                    } else {
                        strUrl += '&' + k + '=' + filter[k];
                    }
                });

            }
            
        }

        var urlBase = 'https://api.punkapi.com/v2/beers' + strUrl
        
        var dados;
        try {
            dados = await axios({ method:'GET', url: urlBase})
        } catch( error ) {
            return error.response.data;
        }
        
        if ( id ) {
            return dados.data[0];
        } else {
            return dados.data;
        }

    }


}

module.exports = BeerExtService