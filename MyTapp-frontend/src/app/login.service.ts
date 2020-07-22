import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../src/environments/environment';
import {Router} from "@angular/router";

interface Data {
  data: {
    refreshToken: string,
    token: string,
    type: string
  }
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  httpOptions: any;
  public http: HttpClient;

  constructor(
    http: HttpClient,
    private router: Router
  ) {


    this.http = http;
    localStorage.removeItem('auth');
  }

 logar(user: any) {
   let email = user.email;
   let url = environment.url + 'auth/login'
   this.http.post<Data>(url, user)
      .subscribe( data => {

        console.log(data);


        localStorage.setItem('auth', JSON.stringify(data))

        url = environment.url + 'me'

        let headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + data.data.token
        }

        this.http.get(url, {
            headers: headers
          })
          .subscribe( data => {

            localStorage.setItem('user', JSON.stringify(data))

            window.location.href = "/"

          }, error =>{
            if ( error.status == 401) {
              alert('Não foi possível obter os dados do usuário!')
            } else if ( error.status == 404) {
              alert('Dados incorretos para processar!')
            } else {
              alert( 'Erro interno do servidor!' )
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
}
