import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../common/services/user.service';
import { User } from '../../../../common/models/user';
import { DatesItem } from '../../../common/dates-item';

@Component({
  selector: 'app-date-item',
  templateUrl: './item-date.component.html',
  styleUrls: ['./item-date.component.scss']
})
export class ItemDateComponent implements OnInit {
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
