import { Component, OnInit } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import {Contact, User} from '../../common/models/user';

@Component({
  selector: 'app-create-update-user-page',
  templateUrl: './create-update-user-page.component.html',
  styleUrls: ['./create-update-user-page.component.scss']
})
export class CreateUpdateUserPageComponent{
  newUser: User;

  constructor(readonly userService: UserService) {
  }

  extractUser(user): any {
    this.newUser = user;
    console.log(user);
    this.newUser.contacts = [new Contact('a', 'b')];
    this.newUser.dates = ['16/04/2019'];
    this.newUser.type = 'developer';
    this.newUser.phone = '380647855544';
    this.newUser.email = 'danylo11@gmail.com';
    this.userService.addUser(this.newUser)
      .subscribe((data: User) => {
      });
  }
}
