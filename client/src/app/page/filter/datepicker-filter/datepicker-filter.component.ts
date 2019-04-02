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
  collectEvents: any[];
  filterResult: any;
  isDropup: boolean;
  title: string;
  dropDownPositionClassNames: any;

  constructor(private dropDownService: DropDownService) { }

  ngOnInit() {
    const titleObj = this.getTitleObject(this.filterItem.options);
    this.title = titleObj.value === -1 ? titleObj.name : titleObj.value;
    this.dateDefault = this.filterItem.defaultValue === -1 ? new Date() : this.convertStringToDate(titleObj.value);
    this.isDropup = false;
    this.collectEvents = [];
    this.getDropDownPositionClassNames();
  }

  getTitleObject = (options: []): {name, value} => {
    return options.filter((item: {value, name}) => item.value === this.filterItem.defaultValue )[0];
  }

  convertStringToDate = (dateStr: string) => {
    const dateParts = dateStr.split('/');
    return new Date(+ dateParts[2], (+ dateParts[1]) - 1, + dateParts[0]);
  }

  choiceReady = () => {
    (this.collectEvents.length - 1) ? this.filterVal.emit(this.filterResult) : this.filterVal.emit(-1);
  }

  cancelFilter = (i, event) => {
    this.collectEvents = [...this.collectEvents, 'cancelFilter'];
    this.filterResult = i;
    event.preventDefault();
  }

  selectDate = (event) => {
    this.collectEvents = [...this.collectEvents, 'selectDate'];
    this.filterResult = this.convertDateToString(event);
  }

  convertDateToString = (date: Date) => {
    const dd = (date.getDate() < 10) ? ('0' + date.getDate()) : date.getDate();
    const mm = ((date.getMonth() + 1) < 10) ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    const yyyy = date.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
  }

  getDropDownPositionClassNames(): void {
    this.dropDownService.checkDropDownElPosition(this.dropDownWrapperView).subscribe(cssClassNames => {
      this.dropDownPositionClassNames = cssClassNames;
    });
  }

}
