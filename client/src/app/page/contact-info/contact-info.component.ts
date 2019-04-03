import { Component, OnInit } from '@angular/core';
import { User } from '../../app_models/user';
import { UserService } from '../../app_services/user.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {
  users: User[];
  filterText: string = "";

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadAllUsers();
  }

  takeFilterValue(text: string) {
    this.filterText = text;
  }

  loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; } );
  }

}
