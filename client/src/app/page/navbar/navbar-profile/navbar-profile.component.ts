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

    this.navItemsService.getNavList()
      .subscribe(list => this.menuList = list);
    this.userType = this.userService.getUserType();
    this.todayDate = new Date();
  }

  openTaskByid(id: string): boolean {
    this.taskService.isOpenTask.next(id);

    return false;
  }

  loadDates(): void {
    this.userService.getUsersOfHr()
      .subscribe(user => {
        this.dateList = [];
        user.map((item) => {
          item.dates.map((items) => {
            this.dateList = [...this.dateList, items];
          });
        });
        this.dateList = this.dateList.filter(date =>
          this.dateService.convertDate(date.date) === this.dateService.convertDate(this.todayDate)
        );
        this.datesCount = this.dateList.length;
      });
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

  findNewTasks(all: any, watched: string[]): Task[] {
    if (this.userType === 'hr') {
      all.filter(task => task.author !== this.user._id);
    }
    if (this.userType === 'developer') {
      all.filter(task => task.resolvedByPerformer);
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
