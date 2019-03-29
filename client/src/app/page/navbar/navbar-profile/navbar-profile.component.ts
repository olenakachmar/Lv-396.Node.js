import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-profile',
  templateUrl: './navbar-profile.component.html',
  styleUrls: ['./navbar-profile.component.scss']
})
export class NavbarProfileComponent implements OnInit {
  @Input() menuRight: any;

  avatar: string;
  name: string;
  surname: string;
  notificationsNumber: number;

  constructor() { }

  ngOnInit() {
    this.avatar = 'assets/img/navbar-symbol-mob.png';
    this.name = 'Name';
    this.surname = 'Surname';
    this.notificationsNumber = 7;
  }

  changeCurrent(index, links) {
    event.preventDefault();
    links.forEach(item => {
      item.isCurrent = false;
    });
    if (index !== 0) {
      links[index].isCurrent = true;
    }
  }

}
