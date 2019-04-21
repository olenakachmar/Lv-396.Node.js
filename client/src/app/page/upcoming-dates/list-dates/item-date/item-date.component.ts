import { Component, OnInit, Input } from '@angular/core';
import { DatesItem } from '../../../common/dates-item';
import moment from 'moment';

@Component({
  selector: 'app-date-item',
  templateUrl: './item-date.component.html',
  styleUrls: ['./item-date.component.scss']
})
export class ItemDateComponent implements OnInit {
  @Input() date: DatesItem;
  todayDate: string;

  ngOnInit(): void {
    this.todayDate = String(new Date());
  }
  convertDate(date: number): string {
    return moment(date)
      .format('L');
  }
}
