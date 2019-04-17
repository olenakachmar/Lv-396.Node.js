import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../common/services/user.service';
import { User } from '../../../common/models/user';
import { DatesItem } from '../../common/dates-item';

@Component({
  selector: 'app-list-dates',
  templateUrl: './list-dates.component.html',
  styleUrls: ['./list-dates.component.scss']
})
export class ListDatesComponent implements OnInit {
  user = new User();
  dateList: DatesItem[];

  constructor(
    private readonly userService: UserService) {}

  ngOnInit(): void {
    this.loadUser();
  }
  loadUser(): void {
    this.userService.getUser()
      .subscribe(user => {
        this.dateList = user.dates;
      });
  }
}
