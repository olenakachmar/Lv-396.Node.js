import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../app_services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../../app_services/user.service';
import { User } from '../../../app_models/user';
import { NavItemsService } from '../../common/nav-items.service';
import { NavItem } from '../../common/nav-item';

@Component({
  selector: 'app-navbar-profile',
  templateUrl: './navbar-profile.component.html',
  styleUrls: ['./navbar-profile.component.scss']
})

export class NavbarProfileComponent implements OnInit {
  user = new User();
  avatar: string;
  notificationsNumber: number;
  menuList: NavItem[];
  userType: string;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly navItemsService: NavItemsService,
    private readonly userService: UserService) { }

  ngOnInit() {
    this.loadUser();
    this.navItemsService.getNavList().subscribe(list => this.menuList = list);
    this.userType = this.userService.getUserType();
    this.avatar = 'assets/img/userimg.jpg';
    this.notificationsNumber = 7;
  }

  loadUser() {
    this.userService.getUser().subscribe(user => this.user = user);
  }

  logout(): boolean {
    this.authService.logout();
    this.router.navigate(['/home']);
    return false;
  }

  changeCurrent(i) {
    event.preventDefault();
    this.menuList.map((item, index) => item.current = index === i);
    if (this.menuList[i].logout) {
      this.logout();
    }
  }
}
