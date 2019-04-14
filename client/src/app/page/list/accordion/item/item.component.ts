import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Task } from '../../../common/task';
import { TasksService } from '../../../common/tasks.service';
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
  user = new User();
  users: User[];
  constructor(private readonly router: Router, private readonly route: ActivatedRoute,
              private readonly userService: UserService, private readonly tasksService: TasksService) {}

  ngOnInit(): void {
    this.loadUser();
    this.userService.getAll()
      .subscribe(users => this.users = users);
  }

  loadUser(): boolean {
    this.userService.getUser()
      .subscribe(user => this.user = user);

    return false;
  }

  

  selectUser(uid: number): void {
    this.router.navigate(['/profile/my-profile/', uid], {relativeTo: this.route});
  }

  resolveClick(): void {
    this.tasksService.updateResolvedBy(this.user._id, this.task.id)
      .subscribe(item => console.log(item));
  }
}

