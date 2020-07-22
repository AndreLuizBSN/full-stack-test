import { Component, OnInit } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css']
})
export class BeerListComponent implements OnInit {

  public http: HttpClient;
  beers: any[];
  headers: any;
  hasRegisters: boolean;
  defaultPage: any;

  constructor(
    http: HttpClient
  ) {
    this.http = http;
    this.beers = [];
    this.hasRegisters = true;
    this.defaultPage = 1;
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('auth')).data.token
    }
  }

  carregarDados( url ) {

    this.http.get<any>(url, {
      headers: this.headers
    } )
      .subscribe( data => {
        this.beers = data;

        if ( this.beers.length > 0 ) {
          this.hasRegisters = true;
          $('#btn-next').prop('disabled', false);
        } else {
          $('#btn-next').prop('disabled', true);
          this.hasRegisters = false;
        }

        this.beers.forEach(beer => {
          beer.ebc_class = '';
          if ( beer.ebc >= 0 && beer.ebc <= 4 ) {
            beer.ebc_class = 'ebc-1';
          } else if ( beer.ebc > 4 && beer.ebc <= 8 ) {
            beer.ebc_class = 'ebc-2';
          } else if ( beer.ebc > 8 && beer.ebc <= 12 ) {
            beer.ebc_class = 'ebc-3';
          } else if ( beer.ebc > 12 && beer.ebc <= 16 ) {
            beer.ebc_class = 'ebc-4';
          } else if ( beer.ebc > 16 && beer.ebc <= 20 ) {
            beer.ebc_class = 'ebc-5';
          } else if ( beer.ebc > 20 && beer.ebc <= 24 ) {
            beer.ebc_class = 'ebc-6';
          } else if ( beer.ebc > 24 && beer.ebc <= 28 ) {
            beer.ebc_class = 'ebc-7';
          } else if ( beer.ebc > 28 && beer.ebc <= 31 ) {
            beer.ebc_class = 'ebc-8';
          } else if ( beer.ebc > 31 && beer.ebc <= 35 ) {
            beer.ebc_class = 'ebc-9';
          } else if ( beer.ebc > 35 && beer.ebc <= 39 ) {
            beer.ebc_class = 'ebc-10';
          } else if ( beer.ebc > 39 && beer.ebc <= 41 ) {
            beer.ebc_class = 'ebc-11';
          } else if ( beer.ebc > 41 && beer.ebc <= 47 ) {
            beer.ebc_class = 'ebc-12';
          } else if ( beer.ebc > 47 && beer.ebc <= 51 ) {
            beer.ebc_class = 'ebc-13';
          } else if ( beer.ebc > 51 && beer.ebc <= 55 ) {
            beer.ebc_class = 'ebc-14';
          } else if ( beer.ebc > 55 && beer.ebc <= 61 ) {
            beer.ebc_class = 'ebc-15';
          } else if ( beer.ebc > 61 && beer.ebc <= 63 ) {
            beer.ebc_class = 'ebc-16';
          } else if ( beer.ebc > 63 && beer.ebc <= 67 ) {
            beer.ebc_class = 'ebc-17';
          } else if ( beer.ebc > 67 && beer.ebc <= 71 ) {
            beer.ebc_class = 'ebc-18';
          } else if ( beer.ebc > 71 && beer.ebc <= 75 ) {
            beer.ebc_class = 'ebc-19';
          } else if ( beer.ebc > 75 && beer.ebc <= 79 ) {
            beer.ebc_class = 'ebc-20';
          } else if ( beer.ebc > 79 ) {
            beer.ebc_class = 'ebc-21';
          }
        });

    }, error =>{
      if ( error.status == 401) {
        alert('Usuário ou senha inválido!')
      } else {
        alert( 'Erro interno do servidor!' )
      }
    });
  }

  ngOnInit() {

    var pageUrl = '';

    var keyValuePairs = location.search.slice(1).split("&");

    if ( keyValuePairs[0] != "" ) {
      keyValuePairs.forEach(function(keyValuePair) {
        if ( pageUrl == '' ) {
            pageUrl += '?' + keyValuePair
        } else {
          pageUrl += '&' + keyValuePair
        }
      });
    }

    var url = environment.url + 'beers' + pageUrl

    this.carregarDados( url );

  }

  showFilters() {
    if ($('.filters').css('display') == "block") {
      $('.filters').slideUp('fast')
      $('#show-filters-btn').text('Show Filters')
    } else {
      $('.filters').slideDown('fast')
      $('#show-filters-btn').text('Hide Filters')
    }
  }

  applyFilters() {
    var beer_name = $("#beer_name").val();
    var yeast = $("#yeast").val();
    var hops = $("#hops").val();
    var abv_gt = $("#abv_gt").val();
    var abv_lt = $("#abv_lt").val();
    var ibu_gt = $("#ibu_gt").val();
    var ibu_lt = $("#ibu_lt").val();
    var ebc_gt = $("#ebc_gt").val();
    var ebc_lt = $("#ebc_lt").val();
    var brewed_before = $("#brewed_before").val();
    var brewed_after = $("#brewed_after").val();
    var malt = $("#malt").val();
    var food = $("#food").val();

    if ( brewed_before ) {
      var bArr = brewed_before.split('-')
      brewed_before = bArr[1] + '-' + bArr[0]
    }
    if ( brewed_after ) {
      var bArr = brewed_after.split('-')
      brewed_after = bArr[1] + '-' + bArr[0]
    }

    var urlFilter = ''

    urlFilter = this.urlMount( urlFilter, 'beer_name', beer_name, true )
    urlFilter = this.urlMount( urlFilter, 'yeast', yeast, true)
    urlFilter = this.urlMount( urlFilter, 'hops', hops, true)
    urlFilter = this.urlMount( urlFilter, 'abv_gt', abv_gt, false)
    urlFilter = this.urlMount( urlFilter, 'abv_lt', abv_lt, false)
    urlFilter = this.urlMount( urlFilter, 'ibu_gt', ibu_gt, false)
    urlFilter = this.urlMount( urlFilter, 'ibu_lt', ibu_lt, false)
    urlFilter = this.urlMount( urlFilter, 'ebc_gt', ebc_gt, false)
    urlFilter = this.urlMount( urlFilter, 'ebc_lt', ebc_lt, false)
    urlFilter = this.urlMount( urlFilter, 'brewed_before', brewed_before, false)
    urlFilter = this.urlMount( urlFilter, 'brewed_after', brewed_after, false)
    urlFilter = this.urlMount( urlFilter, 'malt', malt, true)
    urlFilter = this.urlMount( urlFilter, 'food', food, true)

    window.location.replace('/' + urlFilter)

  }

  urlMount( strUrl, nameFilter, filter, isText ){

    if ( isText ) {
      filter = filter.split(' ').join('_')
    }

    if ( filter ) {
      if ( strUrl == '' ) {
        strUrl += '?' + nameFilter + '=' + filter
      } else {
        strUrl += '&' + nameFilter + '=' + filter
      }
    }

    return strUrl;
  }

  navigation( next ) {

    var keyValuePairs = location.search.slice(1).split("&");

    var pageUrl = '';

    var kArr;
    var hasPage = false;
    var defPageVal = 0;

    if ( keyValuePairs[0] != "" ) {
      keyValuePairs.forEach(function(keyValuePair) {
        kArr = keyValuePair.split('=')
        if ( kArr[0] == 'page' ) {
          hasPage = true;
          if ( next ) {
            keyValuePair = 'page=' + ( parseInt(kArr[1]) + 1 )
          } else if ( parseInt(kArr[1]) > 1 ) {
            keyValuePair = 'page=' + ( parseInt(kArr[1]) - 1 )
          }
        }
        if ( pageUrl == '' ) {
            pageUrl += '?' + keyValuePair
        } else {
          pageUrl += '&' + keyValuePair
        }
      });

    } else {
      hasPage = true;
      if ( next ) {
        pageUrl = '?page=2'
      } else {
        pageUrl = '?page=1'
      }
    }

    if ( ! hasPage ) {
      if ( next ) {
        pageUrl += '&page=2'
      } else {
        pageUrl += '&page=1'
      }
    }

    window.location.replace('/' + pageUrl)
  }

}
