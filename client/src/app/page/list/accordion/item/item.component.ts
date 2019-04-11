import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Task, TaskImpl } from '../../../common/task';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../app_services/user.service';
import { User } from '../../../../app_models/user';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() task: Task;
  user: User[];
  component: Task;
  item: Task;

  constructor(private readonly router: Router, private readonly route: ActivatedRoute, private readonly userService: UserService) {}

  ngOnInit(): void {}

  selectUser(uid: number): void {
    this.router.navigate(['/profile/my-profile/', uid], {relativeTo: this.route});
  }
  resolveClick(): void {
    if (this.task.resolveByAuthor === true && this.task.resolveByDev === true) {

      console.log(this.task);
     }
  }
}
