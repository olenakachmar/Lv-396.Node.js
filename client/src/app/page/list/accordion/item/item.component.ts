import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Task } from '../../../common/task';
import { TasksService } from '../../../common/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../common/services/user.service';
import { User } from '../../../../common/models/user';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() task: Task;
  user = new User();
  users: User[];
  checkedResolve: boolean;
  cssClass: string;
  cssClassVisible: string;
  markResolve: boolean;
  alertMessage: string;
  isOpen: boolean;
  unreadClass: string;
  unreadOpenClass: string;
  taskIsOpen: boolean;

  constructor(private readonly router: Router,
              private readonly route: ActivatedRoute,
              private readonly userService: UserService,
              private readonly tasksService: TasksService) { }

  ngOnInit(): void {
    this.loadUser();
    this.isOpen = this.task.isOpen;
    this.userService.getAll()
      .subscribe(users => this.users = users);
    this.cssClass = '';
    this.taskIsOpen = false;
    this.unreadClass = 'unread';
  }

  openTask(): any {
    this.taskIsOpen = true;
    this.changeClassUnread();
    this.checkedAuthorOrPerformer();
  }

  changeClassUnread(): void {
    this.taskIsOpen ? this.unreadClass = 'unread-open' : this.unreadClass = 'unread';
  }

  checkedAuthorOrPerformer(): any {
    this.checkedResolve = this.user._id === this.task.author._id ?  this.task.resolvedByAuthor : this.task.resolvedByPerformer;
    this.cssClass = this.checkedResolve ? 'hiddenMark' : '';

    return this.checkedResolve;
  }

  loadUser(): boolean {
    this.userService.getUser()
      .subscribe(user => this.user = user);

    return false;
  }

  selectUser(uid: string): void {
    this.router.navigate(['/profile/my-profile/', uid], { relativeTo: this.route });
  }

  resolveClick(): void {
    this.tasksService.updateResolvedBy(this.user._id, this.task.id)
      .subscribe((item: any) => item);
    this.cssClass = 'hiddenMark';
    this.cssClassVisible = 'visible';
    this.markResolve = true;
    this.alertMessage = 'Your issue has been marked as resolved.';
    setTimeout(() => {
      this.markResolve = false;
    }, 3000);
  }

}
