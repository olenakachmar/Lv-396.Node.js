import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  frm: FormGroup;

  constructor(private readonly router: Router, private readonly fb: FormBuilder) {
    this.frm = fb.group({
      email: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

}
