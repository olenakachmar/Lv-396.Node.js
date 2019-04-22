import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../app/common/services/user.service';
import { User } from '../../../../common/models/user';
import { DatesItem } from '../../../common/dates-item';
import moment from 'moment';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  user = new User();
  dateList: DatesItem[];

  constructor(
    private readonly userService: UserService) { }

  ngOnInit(): void {
    this.loadUser();
  }
  loadUser(): void {
    this.userService.getUser()
      .subscribe(user => {
        this.dateList = user.dates;
      });
  }
  convertDate(date: number): string {
    return moment(date)
      .format('L');
  }
}
