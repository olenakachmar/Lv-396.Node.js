import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../common/task';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../app_services/user.service';
import { User } from '../../../../app_models/user';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() tasks: Task[];
  user: User[];
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {}

  selectUser(uid: number) {
    this.router.navigate(['/profile/my-profile/', uid], {relativeTo: this.route} );
  }
}
