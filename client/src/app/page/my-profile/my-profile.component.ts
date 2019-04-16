import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../common/services/user.service';
import { User } from '../../common/models/user';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  constructor(private readonly UserInfoService: UserService, private readonly route: ActivatedRoute) { }

  user: User;
  id: any;

  ngOnInit() {
    this.checkIdParam();
  }

  checkIdParam(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadUser(this.id);
  }

  getFullName(): string {
    return `${this.user.firstName} ${this.user.lastName}`;
  }

  loadUser(id: string) {
    this.UserInfoService.getUser(this.id).subscribe(user => { this.user = user; });
  }

}
