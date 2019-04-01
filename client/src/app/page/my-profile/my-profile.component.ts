import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../app_services/user-info.service';
import { IUser } from '../../app_interfaces/user.interface';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  constructor(private userInfoService: UserInfoService) { }

   user: IUser;


  ngOnInit() {
    this.loadUser();

  }

  getFullName(): string {
    return `${this.user.firstName} ${this.user.lastName}`;
  }

  loadUser() {
    this.userInfoService.getUser().subscribe(user => { this.user = user; } );
  }
}
