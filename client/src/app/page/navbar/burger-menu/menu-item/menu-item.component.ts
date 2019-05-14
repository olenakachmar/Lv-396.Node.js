import { Component, OnInit, Input } from '@angular/core';
import { NavItem } from '../../../common/nav-item';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['../burger-menu.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Input() public userType: string;
  @Input() public link: NavItem;

  ngOnInit(): void {
  }
}
