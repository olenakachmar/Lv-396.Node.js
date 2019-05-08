import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavItem } from '../../../common/nav-item';
import { NavItemsService } from '../../../common/nav-items.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['../burger-menu.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Input() public userType: string;
  @Input() public link: NavItem;
  @Output() readonly closeMenu: EventEmitter<boolean> = new EventEmitter();

  constructor(private readonly navItemsService: NavItemsService) { }

  ngOnInit(): void {
  }

  currentByIndex(i: number): boolean {
    this.navItemsService.currentIndex(i);
    this.closeMenu.emit(false);

    return false;
  }

}
