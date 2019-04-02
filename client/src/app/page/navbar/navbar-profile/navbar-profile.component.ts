import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../app_services/auth.service';
import { Router } from '@angular/router';
import { NavItemsService } from '../../common/nav-items.service';
import { NavItem } from '../../common/nav-item';

@Component({
  selector: 'app-navbar-profile',
  templateUrl: './navbar-profile.component.html',
  styleUrls: ['./navbar-profile.component.scss']
})

export class NavbarProfileComponent implements OnInit {
  avatar: string;
  name: string;
  surname: string;
  notificationsNumber: number;
  menuList: NavItem[];

  constructor(private authService: AuthService, private router: Router, private navItemsService: NavItemsService) { }

  ngOnInit() {
    this.avatar = 'assets/img/navbar-symbol-mob.png';
    this.name = 'Name';
    this.surname = 'Surname';
    this.notificationsNumber = 7;
    this.navItemsService.getNavList().subscribe(item => { this.menuList = item });
  }

  logout(): boolean {
    this.authService.logout();
    this.router.navigate(['/home']);
    return false;
  }

  changeCurrent(index) {
    event.preventDefault();
    this.menuList.forEach(item => {
      item.current = false;
      item.title !== "Log Out" ? this.menuList[index].current = true : this.logout();
    });
  }
}
