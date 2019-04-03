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
  user: User;

    constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
  }

  selectUser(uid: number) {
    this.router.navigate(['/profile/my-profile/', uid], {relativeTo: this.route} );
  }

}
