import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../common/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../../common/services/user.service';
import { User } from '../../../common/models/user';
import { NavItemsService } from '../../common/nav-items.service';
import { NavItem } from '../../common/nav-item';
import { DatesItem } from '../../common/dates-item';
import moment from 'moment';

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
  todayDate: string;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly navItemsService: NavItemsService,
    private readonly userService: UserService) {}

  ngOnInit(): void {
    this.loadUser();
    this.navItemsService.getNavList()
      .subscribe(list => this.menuList = list);
    this.userType = this.userService.getUserType();
    this.newTasksCount = 7;
    this.todayDate = String(new Date());
  }

  loadUser(): void {
    this.userService.getUser()
      .subscribe(user => {
        this.avatar = user.photoURL || 'assets/img/userimg.jpg';
        this.user = user;
      });
    this.userService.getUsersOfHr()
      .subscribe(user => {
        this.dateList = [];
        user.map((item) => {
          item.dates.map((items) => {
            this.dateList = [...this.dateList, items ];
          });
        });
        this.dateList = this.dateList.filter(date =>
          this.convertDate(date.date) === this.convertDate(this.todayDate));
        this.datesCount = this.dateList.length;
      });
  }

  logout(): boolean {
    this.authService.logout();
    this.router.navigate(['/home']);

    return false;
  }

  currentByRout(currentRouter: string): boolean {
    this.navItemsService.currentRouter(currentRouter);
    this.active = false;

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
  convertDate(date: string): string {
    return moment(date)
      .format('L');
  }
  trackById(link: any): string {
    return link.id;
  }
}
