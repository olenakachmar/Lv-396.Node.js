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
  submitted: boolean;
  showInputErrorslogin = false;
  showInputErrorsPassword = false;

  constructor(private readonly authService: AuthService, public router: Router, private readonly fb: FormBuilder) {
    this.frm = fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.hasFailed = false;
  }

  auth(form: any): boolean {
    this.submitted = true;
    const helper = new JwtHelperService();
    if (this.frm.invalid && this.frm.get('login').value === '') {
      this.showInputErrorslogin = true;

      return undefined;
    }
    if (this.frm.invalid && this.frm.get('password').value === '') {
      this.showInputErrorsPassword = true;

      return undefined;
    }

    this.frm.valueChanges.subscribe((value: string) => {
      if (value.length !== 0) {
        this.hasFailed = false;
      }
    });

    this.authService
      .auth(form.login, form.password)
      .subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('type', helper.decodeToken(response.token).type);
          this.router.navigate(['/profile']);
        },
        (error) => {
          this.hasFailed = true;
        }
      );

    return false;
  }

}
