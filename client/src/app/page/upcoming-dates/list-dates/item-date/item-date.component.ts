import { Component, OnInit, Input } from '@angular/core';
import { DatesItem } from '../../../common/dates-item';
import { DateService } from '../../../common/date.service';

@Component({
  selector: 'app-date-item',
  templateUrl: './item-date.component.html',
  styleUrls: ['./item-date.component.scss']
})
export class ItemDateComponent implements OnInit {
  @Input() date: DatesItem;
  todayDate: Date;
  constructor(
    private readonly dateService: DateService) {}

  ngOnInit(): void {
    this.todayDate = new Date();
  }
  public convertDate = (date: Date): boolean =>
    this.dateService.convertDate(this.todayDate) === this.dateService.convertDate(date);
}
