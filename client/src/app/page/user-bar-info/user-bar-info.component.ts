import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../app_models/user';
import { UserService } from '../../app_services/user.service';

@Component({
  selector: 'app-user-bar-info',
  templateUrl: './user-bar-info.component.html',
  styleUrls: ['./user-bar-info.component.scss']
})
export class UserBarInfoComponent implements OnInit {
  @Input() userinfo: User;
  userType: string;
  show: boolean;

  constructor(readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.userType = this.userService.getUserType();
    if (this.userType !== 'hr') {
      this.show = true;
    }
  }
}
