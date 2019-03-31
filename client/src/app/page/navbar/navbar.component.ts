import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() menuBurger: [];
  @Input() menuRight: [];
  name: string;
  surname: string;
  avatar: string;
  isActiv: boolean;

  jsonData;

  constructor() { }

  ngOnInit() {
    this.isActiv = false;
    this.name  = 'Name';
    this.surname = 'Surname';
    this.avatar = 'assets/img/navbar-symbol-desk.png';
    this.jsonData = {
      menuRight: [
        {
          id: 1,
          href: '#1',
          title: 'Log Out',
          isCurrent: false,
        },
        {
          id: 2,
          href: '#2',
          title: 'Edit Profile',
          isCurrent: false,
        }
      ],
      menuBurger: [
        {
          id: 1,
          href: '#1',
          title: 'upcoming tasks',
          isCurrent: true,
          router: '/profile'
        },
        {
          id: 2,
          href: '#2',
          title: 'contact info',
          isCurrent: false,
          router: 'contact-info',
        },
        {
          id: 3,
          href: '#3',
          title: 'my profile',
          isCurrent: false,
          router: ''
        },
        {
          id: 4,
          href: '#4',
          title: 'create user',
          isCurrent: false,
          router: ''
        }
      ],
    };
  }
  homePage() {
    event.preventDefault();
    this.jsonData.menuBurger.map((item, i) => {
      i === 0 ? item.isCurrent = true : item.isCurrent = false;
    });
  }
  changeCurrent(index, links) {
    event.preventDefault();
    links.forEach(item => {
      item.isCurrent = false;
    });
    links[index].isCurrent = true;
    this.isActiv = false;
  }
}
