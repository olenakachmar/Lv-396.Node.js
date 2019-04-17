import { Component, OnInit, Input, Output, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import { User } from '../../common/models/user';
import { FilterOptions } from '../common/filter-options';
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
  emptyTask: Task = new Task();
  user: User;
  task: Task;
  filters: Filter[];
  tasks: Task[];
  filterCssClassPrefix: string;
  modalTypeVal: string;
  filterGrids: string;
  users: User[];
  userRole: string;

  constructor(
    private readonly userInfoService: UserService,
    private readonly filtersService: FiltersService,
    private readonly tasksService: TasksService,
    private readonly ref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.filterCssClassPrefix = 'filter-col-';
    this.modalTypeVal = 'CREATE';
    this.getFilters();
    this.getTasks();
    this.loadUser();
    this.filterGrids = this.filters.length ? this.filterCssClassPrefix + this.filters.length.toString() : '';
    this.userRole = this.checkUserRole();
  }

  loadUser(): any {
    this.userInfoService.getUser()
      .subscribe(user => { this.user = user; });
  }

  private readonly checkUserRole = (): any =>
    this.userInfoService.getUserType();

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
            status: { name: item.status.name, value: item.status.value },
            type: { name: item.type.name, value: item.type.value },
            date: item.date,
            author: item.author,
            content: item.content,
            resolvedByAuthor: item.resolvedByAuthor,
            resolvedByPerformer: item.resolvedByPerformer,
          })
        )
        .sort((a, b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));
        this.ref.detectChanges();
      });
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
