import { Component } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {

  hasUser: boolean;

  constructor(private router: Router) {
    let user = JSON.parse(localStorage.getItem('user'));

    if ( ! user ) {
      this.hasUser = false;
      this.router.navigate(['/login'])
    } else {
      this.hasUser = true;
    }

  }

}
