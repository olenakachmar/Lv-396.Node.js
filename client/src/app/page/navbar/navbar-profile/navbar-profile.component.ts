import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-profile',
  templateUrl: './navbar-profile.component.html',
  styleUrls: ['./navbar-profile.component.scss']
})
export class NavbarProfileComponent implements OnInit {
  @Input() menuRight:any;
  
  avatar:string = "assets/img/navbar-symbol-mob.png";
  name:string = "Name";
  surname:string = "Surname";
  notificationsNumber:number = 7;

  constructor() { }

  ngOnInit() {
  }

  changeCurrent(index, links) {
    event.preventDefault();
    links.forEach(item => {
      item.isCurrent = false
    })
    if(index !== 0) {
      links[index].isCurrent = true;
    }
  }
}
