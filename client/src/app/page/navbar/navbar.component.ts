import { Component, OnInit } from '@angular/core';
import { NavItemsService } from '../common/nav-items.service';
import { NavItem } from '../common/nav-item';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  name: string;
  surname: string;
  avatar: string;
  isActiv: boolean;
  menuList: NavItem[];

  constructor(private navItemsService: NavItemsService) { }

  ngOnInit() {
    this.isActiv = false;
    this.name  = 'Name';
    this.surname = 'Surname';
    this.avatar = 'assets/img/navbar-symbol-desk.png';
    this.navItemsService.getNavList().subscribe(item => { this.menuList = item });
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
    this.isActiv = false;
  }
}
