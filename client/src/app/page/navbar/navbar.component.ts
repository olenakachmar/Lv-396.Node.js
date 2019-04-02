import { Component, OnInit, HostListener } from '@angular/core';
import { NavItemsService } from '../common/nav-items.service';
import { NavItem } from '../common/nav-item';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  @HostListener('mouseleave') onMouseLeave() {
    this.isActive = false;
  }
  name: string;
  surname: string;
  avatar: string;
  isActive: boolean;
  menuList: NavItem[];
  user: string;

  constructor(private navItemsService: NavItemsService) { }

  ngOnInit() {
    this.isActive = false;
    this.name = 'Name';
    this.surname = 'Surname';
    this.avatar = 'assets/img/navbar-symbol-desk.png';
    this.navItemsService.getNavList().subscribe(item => { this.menuList = item });
    this.user = 'hr';
  }

  homePage() {
    event.preventDefault();
    this.menuList.map((item, i) => {
      i === 0 ? item.current = true : item.current = false;
    });
  }

  changeCurrent(index) {
    event.preventDefault();
    this.menuList.forEach(item => {
      item.current = false;
    });
    this.menuList[index].current = true;
    this.isActive = false;
  }

  toggleIsActive() {
    event.preventDefault();
    this.isActive = !this.isActive;
  }
}
