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
  userId: string;
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
  userType: string;
  newTasks: Task[];

  constructor(private readonly router: Router,
              private readonly route: ActivatedRoute,
              private readonly userService: UserService,
              private readonly tasksService: TasksService) { }

  ngOnInit(): void {
    this.userService.getUser()
    .subscribe(user => this.user = user);
    this.userService.getAll()
      .subscribe(users => this.users = users);
    this.cssClass = '';
    this.taskIsOpen = false;
    this.unreadClass = '';
    this.userType = this.userService.getUserType();
    //this.getUnreadTasks();
    this.changeClassUnread();
    this.userId = this.userService.getUserId();
    console.log(this.task);
  }

  // getUnreadTasks(): void {
  //   if (!this.user.watched_issues.includes(this.task.id)) {
  //     this.unreadClass = 'unread';
  //   } else {
  //     this.unreadClass = '';
  //   }
  // }

  openTask(): any {
    this.taskIsOpen = true;
    this.changeClassUnread();
    this.checkedAuthorOrPerformer();
    console.log(this.user.watched_issues);
  }

  changeClassUnread(): void {
    const test = ['5cd0235a1eddbb1f40841416',
                  '5cd047d71eddbb1f40841419',
                  '5cd14f8e8ca05145f8e35c4c',
                  '5cd034531eddbb1f40841417',
                  '5cd15211eec90e05a4cf9c68',
                  '5cd00c371eddbb1f40841412'];
    if (test.includes(this.task.id) && this.userId !== this.task.author._id && !this.checkedAuthorOrPerformer()) {
      this.taskIsOpen ? this.unreadClass = 'unread-open' : this.unreadClass = 'unread';
    }
  }

  checkedAuthorOrPerformer(): any {
    console.log(this.user);
    this.checkedResolve = this.user._id === this.task.author._id ?  this.task.resolvedByAuthor : this.task.resolvedByPerformer;
    this.cssClass = this.checkedResolve ? 'hiddenMark' : '';

    return this.checkedResolve;
  }

  taskIsWatched(): any {
    // const test = ['5cd0235a1eddbb1f40841416',
    //               '5cd047d71eddbb1f40841419',
    //               '5cd14f8e8ca05145f8e35c4c',
    //               '5cd034531eddbb1f40841417',
    //               '5cd15211eec90e05a4cf9c68',
    //               '5cd00c371eddbb1f40841412'];
    if (!this.user.watched_issues.includes(this.task.id)) {
      this.tasksService.taskIsWatched(this.user._id, this.task.id)
        .subscribe(task => task);
    }

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
