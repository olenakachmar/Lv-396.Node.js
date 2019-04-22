import { Component, OnInit } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import { User } from '../../common/models/user';
import { DatesItem } from '../common/dates-item';
import { FilterOptions } from '../common/filter-options';
import { Filter } from '../common/filter';
import { FiltersService } from '../common/filters.service';


@Component({
  selector: 'app-upcoming-dates',
  templateUrl: './upcoming-dates.component.html',
  styleUrls: ['./upcoming-dates.component.scss']
})
export class UpcomingDatesComponent implements OnInit {
  user = new User();
  filter: Filter[];
  dateList: DatesItem[];
  filterCssClassPrefix: string;
  modalTypeVal: string;
  filterGrids: string;

  constructor(
    private readonly userService: UserService,
    private readonly filtersService: FiltersService) {}

  ngOnInit(): void {
    this.filterCssClassPrefix = 'filter-col-';
    this.modalTypeVal = 'CREATE';
    this.loadUser();
    this.getFilters();
  }
  loadUser(): void {
    this.userService.getUser()
      .subscribe(user => { this.user = user; });
    this.userService.getUsersOfHr()
      .subscribe(user => {
        this.dateList = [];
        user.map((item) => {
          item.dates.map((items) => {
            const dates = {
              firstName: item.firstName,
              lastName: item.lastName,
              topic: items.topic,
              date: items.date
            };
            this.dateList = [...this.dateList, dates ];
          });
        });
      });
  }
  getFilters(): void {
    this.filtersService.getFilters()
      .subscribe(
        filters => this.filter = filters.filter((item: Filter) => item.name === 'date'),
        () => {},
        () => {
          this.filterGrids = this.filter.length ? this.filterCssClassPrefix + this.filter.length.toString() : '';
        }
      );
  }
  selectFilterOption = (data: any) => {
    console.log(data);
    if (this.filter.length) {
      console.log('here');
      this.filter = this.filter.map(
        (item: Filter) => item.id === data.filterId ? {
          id: item.id,
          name: item.name,
          isCalendar: item.isCalendar,
          defaultValue: data.optionId,
          options: this.setOptions(item.isCalendar, item.options, data.optionId)
        } : item
      );
      console.log('filter');
      console.log(this.filter);
    }
  };
  private readonly setOptions = (isCalendar: boolean, options: FilterOptions[], data: any) => {
    if (isCalendar) {
      return this.updateOptions(options, data);
    }

    return options;
  };

  private readonly updateOptions = (options: any, dateValue: any): [] => {
    if (dateValue === -1) {
      return options;
    }

    return options.map(opt =>
      opt.name === 'date' ? { name: opt.name, value: dateValue } : opt);
  };
}
