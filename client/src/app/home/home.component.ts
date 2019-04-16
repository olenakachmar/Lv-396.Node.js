import { Component } from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  frm: FormGroup;
  hasFailed: boolean;
  showInputErrorslogin = false;
  showInputErrorsPassword = false;

  constructor(private readonly authService: AuthService, private readonly router: Router, private readonly fb: FormBuilder) {
    this.frm = fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.hasFailed = false;
  }

  auth(login: string, password: string): boolean {
    const helper = new JwtHelperService();
    if (this.frm.invalid && this.frm.get('login').value === '') {
      this.showInputErrorslogin = true;

      return;
    }
    if (this.frm.invalid && this.frm.get('password').value === '') {
      this.showInputErrorsPassword = true;

      return;
    }

    this.authService
      .auth(login, password)
      .subscribe(
        (response) => {
          localStorage.setItem('token', response['token']);
          localStorage.setItem('type', helper.decodeToken(response['token']).type);
          this.router.navigate(['/profile']);
        },
        (error) => {
          this.hasFailed = true;
        }
      );

    return false;
  }

}
