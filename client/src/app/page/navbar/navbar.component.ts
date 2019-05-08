import { Component, OnInit, Input } from '@angular/core';
import { NavItemsService } from '../common/nav-items.service';
import { UserService } from '../../common/services/user.service';
import { NavItem } from '../common/nav-item';
import { User } from '../../common/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  @Input() user: User;

  name: string;
  surname: string;
  avatar: string;
  active: boolean;
  menuList: NavItem[];
  userType: string;

  constructor(private readonly navItemsService: NavItemsService, private readonly userService: UserService) { }

  ngOnInit(): void {
    this.navItemsService.getNavList()
      .subscribe(list => this.menuList = list);
    this.userType = this.userService.getUserType();
  }

  currentByRout(currentRouter: string): boolean {
    this.navItemsService.currentRouter(currentRouter);

    return this.active = false;
  }

  currentByIndex(i: number): boolean {
    this.navItemsService.currentIndex(i);

    return this.active = false;
  }

  closeBurger(event): void {
    this.active = event;
  }

  toggleIsActive(): boolean {
    this.active = !this.active;

    return false;
  }

  trackById(link: NavItem): string {
    return link.id;
  }
}
