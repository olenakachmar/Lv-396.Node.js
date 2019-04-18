import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../common/services/auth.service';
import { UserService } from '../../../common/services/user.service';
import { NavItemsService } from '../../common/nav-items.service';
import { TasksService } from '../../common/tasks.service';
import { User } from '../../../common/models/user';
import { Task } from '../../common/task';
import { NavItem } from '../../common/nav-item';
import { DatesItem } from '../../common/dates-item';

@Component({
  selector: 'app-navbar-profile',
  templateUrl: './navbar-profile.component.html',
  styleUrls: ['./navbar-profile.component.scss']
})

export class NavbarProfileComponent implements OnInit {
  user = new User();
  avatar: string;
  newTasksCount: number;
  menuList: NavItem[];
  dateList: DatesItem[];
  userType: string;
  datesCount: number;
  active: boolean;
  userTasks: any[];
  // openedTasks: string[];

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly navItemsService: NavItemsService,
    private readonly userService: UserService,
    private readonly taskService: TasksService) { }

  ngOnInit(): void {
    this.loadUserInfo();
    this.navItemsService.getNavList()
      .subscribe(list => this.menuList = list);
    this.userType = this.userService.getUserType();
  }

  loadUserInfo(): void {
    this.userService.getUser()
      .subscribe(user => {
        this.user = user;
        this.avatar = user.photoURL || 'assets/img/userimg.jpg';
        this.dateList = user.dates;
        this.datesCount = user.dates.length;
        // this.openedTasks = user.watched_issues;
        // this.loadUserTasks(user._id);
        this.taskService.getUserTasks(user._id)
          .subscribe(tasks => {
            this.userTasks = tasks;
            if (user.watched_issues.length > 0) {
              this.newTasksCount = this.getNewTasks(tasks, user.watched_issues).length;
            }
          });
      });
  }

  loadUserTasks(id): Task[] {
    this.taskService.getUserTasks(id)
      .subscribe(tasks => this.userTasks = tasks);

    return this.userTasks;
  }

  // getNewTasks(): Task[] {
  //   if (this.openedTasks) {
  //     return this.userTasks.filter(task => !(this.openedTasks.includes(task._id)));
  //   }
  // }
  getNewTasks(all: any[], watched: string[]): Task[] {
    if (this.userType === 'hr') {
      return all.filter(task => task.author !== this.user._id);
    }
    if (this.userType === 'developer') {
      return all.filter(task => task.resolvedByPerformer);
    }

    return all.filter(task => !(watched.includes(task._id)));
  }

  logout(): boolean {
    this.authService.logout();
    this.router.navigate(['/home']);

    return false;
  }

  currentByIndex(i: number): boolean {
    this.navItemsService.currentIndex(i);
    if (this.menuList[i].logout) {
      this.menuList[i].current = false;
      this.logout();
    }

    return false;
  }

  currentByRout(currentRouter: string): boolean {
    this.navItemsService.currentRouter(currentRouter);

    return this.active = false;
  }

  trackById(link: NavItem): string {
    return link.id;
  }
}
