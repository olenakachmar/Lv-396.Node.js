import { Component, EventEmitter, Input, OnInit, Output, ElementRef, ViewChild } from '@angular/core';
import { FilterOptions } from '../../common/filter-options';
import { Filter } from '../../common/filter';
import { DropDownService } from '../../common/drop-down.service';

@Component({
  selector: 'app-datepicker-filter',
  templateUrl: './datepicker-filter.component.html',
  styleUrls: ['./datepicker-filter.component.scss']
})
export class DatepickerFilterComponent implements OnInit {
  @Input() filterItem: Filter;
  @Input() cssClassName: string;
  @Output() readonly filterVal = new EventEmitter();
  @ViewChild('dropDownWrapper') dropDownWrapperView: ElementRef;
  dateDefault: Date;
  filterResult: any;
  isDropup: boolean;
  titleObj: FilterOptions;
  title: string;
  dropDownPositionClassNames: any;
  choiseReadyFlag: number;
  cancelLinkText: string;

  private _defaultTitle: string;

  constructor(private readonly dropDownService: DropDownService) { }

  ngOnInit(): void {
    this.cancelLinkText = 'View all dates';
    this.titleObj = this.getTitleObject(this.filterItem.options);
    this.title = this.getTitle(this.titleObj);
    this.dateDefault = this.getDateDefault(this.titleObj.value);
    this.isDropup = false;
    this.getDropDownPositionClassNames();
    this.choiseReadyFlag = 0;
  }

  get defaultTitle(): string {
    this._defaultTitle = this.filterItem.options.filter((item: FilterOptions) => item.value === -1)[0].name;

    return this._defaultTitle;
  }

  private readonly getTitle = (titleObj: any) => {
    if (titleObj.value === -1) {
      return titleObj.name;
    }

    return titleObj.value;
  };

  private readonly getDateDefault = (title: any) => {
    if (this.filterItem.defaultValue === -1) {
      return new Date();
    }

    return this.convertStringToDate(title);
  };

  private readonly getTitleObject = (options: FilterOptions[]): FilterOptions =>
    options.filter((item: FilterOptions) => item.value === this.filterItem.defaultValue)[0];

  private readonly convertStringToDate = (dateStr: string) => {
    const dateParts = dateStr.split('/');

    return new Date(+ dateParts[2], (+ dateParts[1]) - 1, + dateParts[0]);
  };

  cancelFilter = (i: any, event: any): void => {
    this.choiseReadyFlag ++;
    this.filterResult = i;
    this.updateTitle();
    event.preventDefault();
  };

  selectDate = (event) => {
    this.choiseReadyFlag ++;
    this.filterResult = this.convertDateToString(event);
    if (this.isCalendarReady()) {
      this.title = this.filterResult;
    }
  };

  private readonly isCalendarReady = (): boolean =>
    (this.choiseReadyFlag - 1) > 0;

  private readonly convertDateToString = (date: Date): string => {
    const dd = this.getDayStr(date);
    const mm = this.getMonthStr(date);
    const yyyy = date.getFullYear()
      .toString();
    const separator = '/';

    return dd + separator + mm + separator + yyyy;
  };

  private readonly getDayStr = (date: Date): string => {
    const day = date.getDate();
    if (day < 10) {
      const str = '0';

      return str + day.toString();
    }

    return day.toString();
  };

  private readonly getMonthStr = (date: Date): string => {
    const month = date.getMonth() + 1;
    if (month < 10) {
      const str = '0';

      return str + month.toString();
    }

    return month.toString();
  };

  getDropDownPositionClassNames(): void {
    this.dropDownService.checkDropDownElPosition(this.dropDownWrapperView)
      .subscribe(cssClassNames => {
        this.dropDownPositionClassNames = cssClassNames;
    });
  }

  dropDownClosed = () => {
    const val = (this.isCalendarReady()) ? this.filterResult : -1;
    this.filterVal.emit(val);
    this.updateTitle(this.isCalendarReady());
  };

  private readonly updateTitle = (takeDateToTitle: boolean = false): void => {
    this.title = takeDateToTitle ? this.filterResult : this.defaultTitle;
  };

}
