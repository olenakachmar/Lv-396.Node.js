import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecoverPasswordService } from '../../../app_services/recover-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  frm: FormGroup;
  hasFailed = false;
  getResponse = false;
  message: any;
  error: string;

  constructor(private readonly router: Router, private readonly fb: FormBuilder, private recoverPassword: RecoverPasswordService) {
    this.frm = fb.group({
      email: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  send(email: string) {
    this.recoverPassword.forgotPassword(email).subscribe(
      (response) => {
        this.getResponse = true;
        this.message = response;
      },
      (error) => {
        this.error = error.error.err;
        this.hasFailed = true;
      }
    )
  }

}
