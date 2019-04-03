import { Component, EventEmitter, Input, OnInit, Output, ElementRef, ViewChild } from '@angular/core';
import { Filter } from '../../common/filter';
import { DropDownService } from '../../common/drop-down.service';

@Component({
  selector: 'app-datepicker-filter',
  templateUrl: './datepicker-filter.component.html',
  styleUrls: ['./datepicker-filter.component.scss']
})
export class DatepickerFilterComponent implements OnInit {
  @Input() filterItem: Filter;
  @Input() id: number;
  @Input() cssClassName: string;
  @Output() filterVal = new EventEmitter();
  @ViewChild('dropDownWrapper') dropDownWrapperView: ElementRef;
  dateDefault: Date;
  filterResult: any;
  isDropup: boolean;
  title: string;
  dropDownPositionClassNames: any;
  choiseReadyFlag: number;

  constructor(private dropDownService: DropDownService) { }

  ngOnInit() {
    const titleObj = this.getTitleObject(this.filterItem.options);
    this.title = this.getTitle(titleObj);
    this.dateDefault = this.getDateDefault(titleObj.value);
    this.isDropup = false;
    this.getDropDownPositionClassNames();
    this.choiseReadyFlag = 0;
  }

  private getTitle = (titleObj: any) => {
    if (titleObj.value === -1) {
      return titleObj.name;
    }
    return titleObj.value;
  }

  private getDateDefault = (title: any) => {
    if (this.filterItem.defaultValue === -1) {
      return new Date();
    }
    return this.convertStringToDate(title);
  }

  private getTitleObject = (options: []): {name, value} => {
    return options.filter((item: {value, name}) => item.value === this.filterItem.defaultValue )[0];
  }

  private convertStringToDate = (dateStr: string) => {
    const dateParts = dateStr.split('/');
    return new Date(+ dateParts[2], (+ dateParts[1]) - 1, + dateParts[0]);
  }

  choiceReady = () => {
    (this.choiseReadyFlag - 1) ? this.filterVal.emit(this.filterResult) : this.filterVal.emit(-1);
  }

  cancelFilter = (i, event) => {
    this.choiseReadyFlag ++;
    this.filterResult = i;
    event.preventDefault();
  }

  selectDate = (event) => {
    this.choiseReadyFlag ++;
    this.filterResult = this.convertDateToString(event);
  }

  private convertDateToString = (date: Date) => {
    const dd = this.getDayStr(date);
    const mm = this.getMonthStr(date);
    const yyyy = date.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
  }

  private getDayStr = (date: Date) => {
    const day = date.getDate();
    if (day < 10) {
      return '0' + day;
    }
    return day;
  }

  private getMonthStr = (date: Date) => {
    const month = date.getMonth() + 1;
    if (month < 10) {
      return '0' + month;
    }
    return month;
  }

  getDropDownPositionClassNames(): void {
    this.dropDownService.checkDropDownElPosition(this.dropDownWrapperView).subscribe(cssClassNames => {
      this.dropDownPositionClassNames = cssClassNames;
    });
  }

}
