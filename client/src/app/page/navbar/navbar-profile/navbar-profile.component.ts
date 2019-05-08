import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../common/services/auth.service';
import { UserService } from '../../../common/services/user.service';
import { NavItemsService } from '../../common/nav-items.service';
import { DateService } from '../../common/date.service';
import { TasksService } from '../../common/tasks.service';
import { User } from '../../../common/models/user';
import { Task } from '../../common/task';
import { NavItem } from '../../common/nav-item';
import { DatesItem } from '../../common/dates-item';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar-profile',
  templateUrl: './navbar-profile.component.html',
  styleUrls: ['./navbar-profile.component.scss'],
  providers: [AuthService]
})

export class NavbarProfileComponent implements OnInit {
  user = new User();
  avatar: string;
  userType: string;
  newTasks: Task[];
  menuList: NavItem[];
  dateList: DatesItem[];
  newTasksCount: number;
  datesCount: number;
  active: boolean;
  todayDate: Date;
  typeOfUser: boolean;

  constructor(private readonly authService: AuthService,
              private readonly router: Router,
              private readonly navItemsService: NavItemsService,
              private readonly userService: UserService,
              private readonly taskService: TasksService,
              private readonly dateService: DateService) {
  }

  ngOnInit(): void {
    this.loadUser();
    this.loadDates();
    this.loadTypeOfUser();
    this.navItemsService.getNavList()
      .subscribe(list => this.menuList = list);
    this.userType = this.userService.getUserType();
    this.todayDate = new Date();
  }

  openTaskByid(taskID: string): boolean {
    this.taskService.taskIsWatched(this.user._id, taskID);
    this.taskService.isOpenTask.next(taskID);
    setTimeout(() => {
      this.scrollTo(taskID);
    }, 300);

    return false;
  }

  scrollTo(id: string): void {
    document.getElementById(id)
      .scrollIntoView();
  }

  loadTypeOfUser(): void {
    if (this.userService.getUserType() === 'hr') {
      this.typeOfUser = true;
    }
  }

  loadDates(): void {
    if (this.userService.getUserType() === 'hr') {
      this.userService.getUsersOfHr()
        .subscribe(users => {
          this.dateList = [];
          users.map((user) => {
            this.dateList = this.dateService.setDateList(user, this.dateList);
          });
          this.dateList = this.checkTodayDate(this.dateList);
          this.datesCount = this.dateList.length;
        });
    } else if (this.userService.getUserType() === 'developer') {
      this.userService.getUser()
        .subscribe(user => {
          this.dateList = [];
          this.dateList = this.dateService.setDateList(user, this.dateList);
          this.dateList = this.checkTodayDate(this.dateList);
          this.datesCount = this.dateList.length;
        });
    }

  }

  loadUser(): void {
    this.userService.getUser()
      .pipe(
        map(user => this.takeUserInfo(user)),
        switchMap(user => this.taskService.getUserTasks(user._id))
      )
      .subscribe(tasks => {
        if (this.user.watched_issues.length > 0) {
          this.newTasks = this.findNewTasks(tasks, this.user.watched_issues);
          this.newTasks.sort((a, b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));
          this.newTasksCount = this.newTasks.length;
        }
      });
  }

  takeUserInfo(user: User): User {
    this.user = user;
    this.avatar = user.photoURL || 'assets/img/userimg.jpg';

    return user;
  }

  findNewTasks(allTasks: any, watched: string[]): Task[] {
    let arr = [];
    if (this.userType === 'hr') {
      arr = allTasks.filter(task => (task.author._id !== this.user._id && !task.resolvedByPerformer));
    }
    if (this.userType === 'developer') {
      arr = allTasks.filter(task => task.resolvedByPerformer && !task.resolvedByAuthor);
    }

    return arr.filter(task => !(watched.includes(task._id)));
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

  checkTodayDate(dateList): DatesItem[] {
    return dateList.filter(date =>
      this.dateService.convertDate(date.date) === this.dateService.convertDate(this.todayDate)
    );
  }
}
