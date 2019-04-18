import { Component, OnInit, HostListener } from '@angular/core';
import { NavItemsService } from '../common/nav-items.service';
import { UserService } from '../../common/services/user.service';
import { NavItem } from '../common/nav-item';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  constructor(private readonly navItemsService: NavItemsService, private readonly userService: UserService) { }
  name: string;
  surname: string;
  avatar: string;
  active: boolean;
  menuList: NavItem[];
  userType: string;

  @HostListener('mouseleave') onMouseLeave(): void {
    this.active = false;
  }
  @HostListener('window:scroll') onScroll(): void {
    this.active = false;
  }

  ngOnInit(): void {
    this.navItemsService.getNavList()
      .subscribe(list => this.menuList = list);
    this.userType = this.userService.getUserType();
    this.avatar = 'assets/img/navbar-symbol-desk.png';
  }

  currentByRout(currentRouter: string): boolean {
    this.navItemsService.currentRouter(currentRouter);
    this.active = false;

    return false;
  }

  currentByIndex(i: number): boolean {
    this.navItemsService.currentIndex(i);
    this.active = false;

    return false;
  }

  toggleIsActive(): boolean {
    this.active = !this.active;

    return false;
  }

  trackById(link: any): string {
    return link.id;
  }
}
