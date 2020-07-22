import { Component, OnInit } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.css']
})
export class BeerDetailComponent implements OnInit {

  public http: HttpClient;
  beer: any;
  headers: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    http: HttpClient
  ) {
    this.http = http;
    this.beer = new Object();
    this.beer.volume = new Object()
    this.beer.boil_volume = new Object()
    this.beer.ingredients = new Object()
    this.beer.ingredients.hops = []
    this.beer.ingredients.malt = []
    this.beer.method = new Object()
    this.beer.method.mash_temp = []
    this.beer.method.fermentation = new Object()
    this.beer.method.fermentation.temp = new Object()
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
        this.beer = data;

        var percent = ( this.beer.ebc * 100 ) / 80;
        if ( percent > 95 ) percent = 95;

        $('.ebc-level').css('margin-left', percent + '%')

        percent = (( this.beer.srm * 100 ) / 40);
        if ( percent > 95 ) percent = 95;

        $('.srm-level').css('margin-left', percent + '%')

        percent = (( this.beer.abv * 100 ) / 25);
        if ( percent > 95 ) percent = 95;

        $('.abv-level').css('margin-left', percent + '%')

        percent = (( this.beer.ibu * 100 ) / 200);
        if ( percent > 95 ) percent = 95;

        $('.ibu-level').css('margin-left', percent + '%')

        percent = (( this.beer.ph * 100 ) / 13.5);
        if ( percent > 95 ) percent = 95;

        $('.ph-level').css('margin-left', percent + '%')

        percent = (( this.beer.attenuation_level * 100 ) / 100);
        if ( percent > 95 ) percent = 95;

        $('.at-level').css('margin-left', percent + '%')



        console.log(this.beer);


    }, error =>{
      if ( error.status == 401) {
        alert('Usuário ou senha inválido!')
      } else {
        alert( 'Erro interno do servidor!' )
      }
    });
  }

  ngOnInit() {

    var id = this.route.snapshot.paramMap.get("id")

    var url = environment.url + 'beers/' + id

    this.carregarDados( url );

  }
}
