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
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar-profile',
  templateUrl: './navbar-profile.component.html',
  styleUrls: ['./navbar-profile.component.scss']
})

export class NavbarProfileComponent implements OnInit {
  user = new User();
  avatar: string;
  userType: string;
  userTasks: Task[];
  newTasks: Task[];
  menuList: NavItem[];
  dateList: DatesItem[];
  newTasksCount: number;
  datesCount: number;
  active: boolean;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly navItemsService: NavItemsService,
    private readonly userService: UserService,
    private readonly taskService: TasksService) { }

  ngOnInit(): void {
    this.getUser();
    this.navItemsService.getNavList()
      .subscribe(list => this.menuList = list);
    this.userType = this.userService.getUserType();
  }


  getUser(): void {
    this.userService.getUser()
      .pipe(
        map(user => this.takeUserInfo(user)),
        switchMap(user => this.taskService.getUserTasks(user._id))
      )
      .subscribe(tasks => {
        if (this.user.watched_issues.length > 0) {
          this.newTasks = this.takeNewTasks(tasks, this.user.watched_issues);
          this.newTasksCount = this.newTasks.length;
        }
      });
  }

  takeUserInfo(user: User): User {
    this.user = user;
    this.avatar = user.photoURL || 'assets/img/userimg.jpg';
    this.dateList = user.dates;
    this.datesCount = user.dates.length;

    return user;
  }

  takeNewTasks(all: any, watched: string[]): Task[] {
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

