import { Component, OnInit } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import {Contact, User} from '../../common/models/user';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-create-update-user-page',
  templateUrl: './create-update-user-page.component.html',
  styleUrls: ['./create-update-user-page.component.scss']
})
export class CreateUpdateUserPageComponent{
  newUser: User;

  constructor(readonly userService: UserService,
              private readonly router: Router,
              private readonly route: ActivatedRoute) {
  }

  extractUser(user): any {
    this.newUser = user;
    this.newUser.contacts = [new Contact('a', 'b')];
    this.newUser.dates = ['16/04/2019'];
    this.newUser.type = 'developer';
    this.newUser.phone = '644778845';
    this.newUser.email = 'soba@gmail.com';
    this.userService.addUser(this.newUser)
      .subscribe((data: any) => {
      window.location.href = `/profile/my-profile/${data.newUser._id}`;
      });
  }
}

