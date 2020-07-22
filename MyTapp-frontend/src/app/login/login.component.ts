import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../login.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  checkoutForm: any;

  constructor(
    private formBuilder: FormBuilder,
    public loginService: LoginService,
    private router: Router
  ) {
    console.log("Abriu login");

    this.checkoutForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  ngOnInit() {
  }

  async onSubmit(customerData) {
    // Process checkout data here
    console.warn('login ', customerData);

    this.loginService.logar( customerData );

  }

  logout() {
    localStorage.removeItem('auth')
    this.router.navigate(['/login'])
  }


}
