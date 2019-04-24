import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordService } from '../../../common/services/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  frm: FormGroup;
  matchFailed: boolean;
  private resetFailed: boolean;
  resetSuccess: boolean;
  private getResponse: boolean;
  private message: any;
  private error: string;
  private token: string;

  constructor(private readonly router: Router,
              private readonly fb: FormBuilder,
              private resetPassword: ResetPasswordService,
              private readonly snap: ActivatedRoute) {

    this.frm = fb.group({
      password: ['', Validators.required],
      confpassword: ['', Validators.required],
    });

    this.matchFailed = false;
    this.getResponse = false;
    this.resetFailed = false;
    this.resetSuccess = false;
  }

  ngOnInit() {
    this.checkToken();
  }

  checkToken() {
    this.token = this.snap.snapshot.queryParamMap.get('token');
    if (!this.token) {
      this.router.navigate(['/forgot-password'])
    }
  }

  send(pass: string, confPass: string) {
    if (pass !== confPass || pass === '') {
      this.matchFailed = true;
    } else {
      this.resetPassword.sendPassword(pass, this.token).subscribe(
        (response) => {
          this.getResponse = true;
          this.message = response;
          this.resetSuccess = true;
          this.router.navigate(['/home']);
        },
        (error) => {
          this.error = error.error.err;
          this.resetFailed = true;
        }
      );
    }
  }
}
