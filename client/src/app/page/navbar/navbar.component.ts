import { Component, OnInit, HostListener } from '@angular/core';
import { NavItemsService } from '../common/nav-items.service';
import { UserService } from '../../app_services/user.service';
import { NavItem } from '../common/nav-item';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  constructor(private navItemsService: NavItemsService, private userService: UserService) { }
  name: string;
  surname: string;
  avatar: string;
  current: boolean;
  menuList: NavItem[];
  userType: string;

  @HostListener('mouseleave') onMouseLeave() {
    this.current = false;
  }

  ngOnInit() {
    this.navItemsService.getNavList().subscribe(list => { this.menuList = list; });
    this.userType = this.userService.getUserType();
    this.current = false;
    this.avatar = 'assets/img/navbar-symbol-desk.png';
  }

  homePage() {
    event.preventDefault();
    this.menuList.map((item, index) => item.current = index === 0);
  }

  changeCurrent(i) {
    event.preventDefault();
    this.menuList.map((item, index) => item.current = index === i);
    this.current = false;
  }

  toggleIsActive() {
    event.preventDefault();
    this.current = !this.current;
  }
}
