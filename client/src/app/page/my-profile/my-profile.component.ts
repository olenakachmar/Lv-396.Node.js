import { Component, OnInit } from '@angular/core';
import { UserService } from '../../app_services/user.service';
import { User } from '../../app_models/user';
// import { IUser } from '../../app_interfaces/user.interface';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  constructor(private UserInfoService: UserService) { }

   user: User;


  ngOnInit() {
    this.loadUser();

  }

  getFullName(): string {
    return `${this.user.firstName} ${this.user.lastName}`;
  }

  loadUser() {
    this.UserInfoService.getUser().subscribe(user => { this.user = user; } );
  }
}
