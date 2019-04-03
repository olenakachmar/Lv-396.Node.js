import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../app_models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../app_services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() users: User[];
  @Input() filterText: string;
  user = new User();

  constructor(private router: Router, private route: ActivatedRoute, private UserInfoService: UserService) { }

  ngOnInit() {
  }

  selectUser(id: string, _id: number): void {
    this.UserInfoService.getUser(_id).subscribe(user => { this.user = user; console.log(this.user) });
    this.router.navigate(['/profile/my-profile/', id], { relativeTo: this.route });
  }

}
