import { Component, OnInit } from '@angular/core';
import { UserService } from '../../app_services/user.service';
import { User } from '../../app_models/user';
import { Filter } from '../common/filter';
import { FiltersService } from '../common/filters.service';
import { Task, TaskImpl } from '../common/task';
import moment from 'moment';
import { TasksService } from '../common/tasks.service';
import { Status, Type } from '../common/statusOptions.enum';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})

export class WrapperComponent implements OnInit {
  statusOptions: { Status, Type };

  emptyTask: TaskImpl = new TaskImpl();
  user = new User();
  filters: Filter[];
  tasks: Task[];
  users: User[];

  constructor(private UserInfoService: UserService, private filtersService: FiltersService, private tasksService: TasksService) { }

  ngOnInit() {
    this.getFilters();
    this.getTasks();
    this.loadUser();
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
      .subscribe(tasks => {
        this.tasks = tasks.map( (item: any) => {
          return {
            id: item._id,
            name: item.name,
            excerpt: item.excerpt,
            status: {name: item.status, value: this.getStatusValue(item.status)},
            type: {name: item.type, value: this.getTaskType(item.type)},
            date: this.convertDate(item.date),
            author: item.author,
            content: item.content
          };
        });
      });
  }

  getStatusValue = (status: string): number => {
    return Status[status];
  }

  getTaskType = (type: string): number => {
    return Type[type];
  }
  /* Example: from server date looks like '1554287225073' (in millisecond); after convertDate it looks like '04/03/2019' */
  convertDate(date: number): string {
    return moment(date).format('L');
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

  private setOptions = (isCalendar: boolean, options: [], data: any) => {
    if (isCalendar) {
      return this.updateOptions(options, data);
    }
    return options;
  }

  private updateOptions = (options: any, dateValue: any): [] => {
    if (dateValue === -1) {
      return options;
    }
    return options.map(opt => {
      return opt.name === 'date' ? {name: opt.name, value: dateValue} : opt;
    });
  }
}
