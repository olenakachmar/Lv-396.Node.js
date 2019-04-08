import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public frm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) { 
    this.frm = fb.group({
      email: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

}
