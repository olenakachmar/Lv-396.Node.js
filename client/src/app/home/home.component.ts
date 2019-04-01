import { Component, OnInit } from '@angular/core';
import { AuthService } from '../app_services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  message: string;

  public frm: FormGroup;
  public hasFailed = false;
  public showInputErrorslogin = false;
  public showInputErrorsPassword = false;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.message = '';
    this.frm = fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  auth(login: string, password: string): boolean {
    const helper = new JwtHelperService();
    if (this.frm.invalid && this.frm.get('login').value === '') {
      this.showInputErrorslogin = true;
      return;
    } else if (this.frm.invalid && this.frm.get('password').value === '') {
      this.showInputErrorsPassword = true;
      return;
    }

    this.authService
      .auth(login, password)
      .subscribe(
        (response) => {
          localStorage.setItem('username', response.token);
          this.router.navigate(['/profile']);
        },
        (error) => {
          this.hasFailed = true;
        }
      );

    return false;
  }

  ngOnInit() {
  }

}
