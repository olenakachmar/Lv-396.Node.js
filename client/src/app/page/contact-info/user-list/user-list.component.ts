import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../app_models/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() users: User[];
  @Input() filterText: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  selectUser(id: string): void {
    this.router.navigate(['./', id], { relativeTo: this.route });
  }

}
