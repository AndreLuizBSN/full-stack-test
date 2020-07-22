import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router) {

    console.log('Entrou no logout');


    localStorage.removeItem('auth')
    localStorage.removeItem('user')
    window.location.href = "/"

  }

  ngOnInit() {
  }

}
