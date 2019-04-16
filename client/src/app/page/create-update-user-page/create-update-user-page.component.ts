import { Component, OnInit } from '@angular/core';
import { UserService } from '../../app_services/user.service';
import { User } from '../../app_models/user';

@Component({
  selector: 'app-create-update-user-page',
  templateUrl: './create-update-user-page.component.html',
  styleUrls: ['./create-update-user-page.component.scss']
})
export class CreateUpdateUserPageComponent implements OnInit {
  newUser: User;

  constructor(readonly userService: UserService) {
  }

  ngOnInit() {
  }
  extractUser(user): any {
    this.newUser = user;
    this.userService.addUser(this.extractUser(this.newUser))
      .subscribe((data: User) => {
        console.log(data);
      });
  }
}

