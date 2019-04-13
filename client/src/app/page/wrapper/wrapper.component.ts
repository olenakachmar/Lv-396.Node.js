import { Component, OnInit } from '@angular/core';
import { UserService } from '../../app_services/user.service';
import { User } from '../../app_models/user';
import { FilterOptions } from '../common/filter-options';
import { Filter } from '../common/filter';
import { FiltersService } from '../common/filters.service';
import { Task } from '../common/task';
import moment from 'moment';
import { TasksService } from '../common/tasks.service';
import { Status, Type } from '../common/statusOptions.enum';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})

export class WrapperComponent implements OnInit {
  emptyTask: Task = new Task();
  user: User;
  task: Task;
  filters: Filter[];
  tasks: Task[];
  filterCssClassPrefix: string;
  modalTypeVal: string;
  filterGrids: string;
  users: User[];

  constructor(
    private readonly userInfoService: UserService,
    private readonly filtersService: FiltersService,
    private readonly tasksService: TasksService
  ) { }

  ngOnInit(): void {
    this.filterCssClassPrefix = 'filter-col-';
    this.modalTypeVal = 'CREATE';
    this.getFilters();
    this.getTasks();
    this.loadUser();
    this.filterGrids = this.filters.length ? this.filterCssClassPrefix + this.filters.length.toString() : '';
  }

  loadUser(): any {
    this.userInfoService.getUser()
      .subscribe(user => { this.user = user; });
  }

  getFilters(): void {
    this.filtersService.getFilters()
      .subscribe(filters => this.filters = filters);
  }

  updateResolve(): void {
    this.tasksService.updateResolvedBy(this.user._id, this.task.id)
      .subscribe(tasks => this.tasks = tasks);
  }

  getTasks(): void {
    this.tasksService.getTasks()
      .subscribe(tasks => {
        this.tasks = tasks.map((item: any) =>
          ({
            id: item._id,
            name: item.name,
            excerpt: item.excerpt,
            status: { name: item.status, value: this.getStatusValue(item.status) },
            type: { name: item.type, value: this.getTaskType(item.type) },
            date: this.convertDate(item.date),
            author: item.author,
            content: item.content,
            resolvedByAuthor: item.resolvedByAuthor,
            resolvedByPerformer: item.resolvedByPerformer,
          }
          ));
      });
  }

  getStatusValue = (status: string): number =>
    Status[status];

  getTaskType = (type: string): number =>
    Type[type];

  /** Example: from server date looks like '1554287225073' (in millisecond); after convertDate it looks like '03/04/2019' */
  convertDate(date: number): string {
    moment.locale('en-gb');

    return moment(date)
      .format('L');
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
