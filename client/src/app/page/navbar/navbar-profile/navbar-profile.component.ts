import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../common/services/auth.service';
import { UserService } from '../../../common/services/user.service';
import { NavItemsService } from '../../common/nav-items.service';
import { DateService } from '../../common/date.service';
import { TasksService } from '../../common/tasks.service';
import { User } from '../../../common/models/user';
import { Task } from '../../common/task';
import { NavItem } from '../../common/nav-item';
import { DatesItem } from '../../common/dates-item';

@Component({
  selector: 'app-navbar-profile',
  templateUrl: './navbar-profile.component.html',
  styleUrls: ['./navbar-profile.component.scss'],
  providers: [AuthService]
})

export class NavbarProfileComponent implements OnInit {
  @Input() user: User;
  @Input() public userType: string;

  userId: string;
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
              private readonly route: ActivatedRoute,
              private readonly navItemsService: NavItemsService,
              private readonly userService: UserService,
              private readonly taskService: TasksService,
              private readonly dateService: DateService) {
  }

  ngOnInit(): void {
    this.navItemsService.getNavList()
      .subscribe(list => this.menuList = list);
    this.loadDates();
    this.loadUserTasks();
    this.currentByRout(this.router.url);

    this.userId = this.userService.getUserId();
    this.todayDate = new Date();
    this.user.photoURL = this.user.photoURL || 'assets/img/userimg.jpg';
  }

  openTaskByid(taskID: string): boolean {
    // this.taskService.taskIsWatched(this.user._id, taskID)
    //   .subscribe();
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

  loadDates(): void {
    if (this.userService.getUserType() === 'hr') {
      this.typeOfUser = true;
      this.userService.getUsersOfHr()
        .subscribe(users => {
          this.dateList = [];
          users.forEach((user) => {
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

  loadUserTasks(): void {
    // this.taskService.getUserTasks(this.userId)
    this.taskService.allUserTasks
      .subscribe(tasks => {
        this.newTasks = this.findNewTasks(tasks, this.user.watched_issues);
        // this.newTasks.sort((a, b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));
        this.newTasksCount = this.newTasks.length;
      });
  }

  findNewTasks(allTasks: any, watched: string[]): Task[] {
    if (this.userType === 'hr') {
      const arr = allTasks.filter(task => (task.author._id !== this.user._id && !task.resolvedByPerformer));

      return arr.filter(task => !(watched.includes(task._id)));
    }
    if (this.userType === 'developer') {
      return allTasks.filter(task => task.resolvedByPerformer && !task.resolvedByAuthor);
    }
  }

  logout(): boolean {
    this.authService.logout();
    this.router.navigate(['/home']);

    return false;
  }

  editUser(): void {
    this.router.navigate(['/profile/edit-user', this.user._id], { relativeTo: this.route });
  }

  currentByIndex(i: number): boolean {
    this.navItemsService.currentIndex(i);
    if (this.menuList[i].logout) {
      this.menuList[i].current = false;
      this.logout();
    }
    if (this.menuList[i].router === '/profile/edit-user/:id') {
      this.editUser();
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
