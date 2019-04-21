import { Component } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import { Contact, User } from '../../common/models/user';


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
    this.newUser.contacts = [new Contact('a', 'b')];
    this.newUser.type = 'developer';
    this.newUser.phone = '6448845';
    this.newUser.email = 'so@gmail.com';
    this.userService.addUser(this.newUser)
      .subscribe((data: any) => {
        window.location.href = `/profile/my-profile/${data.newUser._id}`;
      });
  }
}

