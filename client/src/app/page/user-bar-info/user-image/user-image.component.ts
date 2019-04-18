import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../app_services/user.service';

@Component({
  selector: 'app-user-image',
  templateUrl: './user-image.component.html',
  styleUrls: ['./user-image.component.scss']
})
export class UserImageComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.form = fb.group({
      avatar: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  upload(form: any) {
    console.log(form.avatar);
    this.userService.getImage(form.avatar).subscribe(users => console.log(users) );
  }

}
