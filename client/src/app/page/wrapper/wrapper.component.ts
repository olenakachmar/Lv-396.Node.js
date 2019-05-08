import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import { User } from '../../common/models/user';
import { FilterOptions } from '../common/filter-options';
import { Filter } from '../common/filter';
import { FiltersService } from '../common/filters.service';
import { Task } from '../common/task';
import { TasksService } from '../common/tasks.service';
import { FILTER_CSS_CLASS_PREFIX } from '../common/config';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})

export class WrapperComponent implements OnInit {
  emptyTask: Task;
  user: User;
  userID: string;
  task: Task;
  filters: Filter[];
  tasks: Task[];
  modalTypeVal: string;
  filterGrids: string;
  users: User[];
  userRole: string;

  constructor(
    private readonly userInfoService: UserService,
    private readonly filtersService: FiltersService,
    private readonly tasksService: TasksService,
    private readonly ref: ChangeDetectorRef,
    @Inject(FILTER_CSS_CLASS_PREFIX) public filterCssClassPrefix: string
  ) { }

  ngOnInit(): void {
    this.modalTypeVal = 'CREATE';
    this.getFilters();
    this.getTasks();
    this.loadUser();
    this.openTaskById();
    this.filterGrids = this.filters.length ? this.filterCssClassPrefix + this.filters.length.toString() : '';
    this.userRole = this.checkUserRole();
    this.userID = this.userInfoService.getUserId();
  }

  loadUser(): void {
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
    this.tasksService.updateResolvedBy(this.userInfoService.getUserId(), this.task.id)
      .subscribe(tasks => { this.tasks = tasks; });
  }

  getTasks(): void {
    this.tasksService.getUserTasks(this.userInfoService.getUserId())
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
            assignTo: item.assignTo,
            reassigned: item.reassigned,
            resolvedByAuthor: item.resolvedByAuthor || false,
            resolvedByPerformer: item.resolvedByPerformer || false,
            isOpen: false
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

  openTaskById(): void {
    this.tasksService.isOpenTask.subscribe((isOpenID: string) => {
      if (this.tasks && isOpenID) {
        this.tasks.map(task => task.isOpen = task.id === isOpenID);
      }
    });
  }

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
