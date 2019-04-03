import { Component, OnInit } from '@angular/core';
import { UserService } from '../../app_services/user.service';
import { User } from '../../app_models/user';
import { Filter } from '../common/filter';
import { FiltersService } from '../common/filters.service';
import { Task } from '../common/task';
import { TasksService } from '../common/tasks.service';


@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  user = new User();
  filters: Filter[];
  tasks: Task[];

  constructor(private UserInfoService: UserService, private filtersService: FiltersService, private tasksService: TasksService) { }

  ngOnInit() {

    this.loadUser();
    this.getFilters();
    this.getTasks();
  }

  loadUser() {
    this.UserInfoService.getUser().subscribe(user => { this.user = user; });
  }

  getFilters(): void {
    this.filtersService.getFilters()
      .subscribe(filters => this.filters = filters);
  }

  getTasks(): void {
    this.tasksService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  filterGrids = () => {
    return this.filters.length ? ('filter-col-' + this.filters.length) : '';
  }

  selectFilterOption = (data: any) => {
    if (this.filters.length) {
      this.filters = this.filters.map(
        (item, index) => index === data.filterId ? {
          id: item.id,
          name: item.name,
          isCalendar: item.isCalendar,
          defaultValue: data.optionId,
          options: this.setOptions(item.isCalendar, item.options, data.optionId)
        } : item
      );
    }
  }

  setOptions = (isCalendar: boolean, options: [], data: any) => {
    if (isCalendar) {
      return this.updateDataFilterOptions(options, data);
    }
    return options;
  }

  updateDataFilterOptions = (options: any, dateValue: any): [] => {
    if (dateValue === -1) {
      return options;
    }
    return options.map(opt => {
      return opt.name === 'date' ? {name: opt.name, value: dateValue} : opt;
    });
  }
}
