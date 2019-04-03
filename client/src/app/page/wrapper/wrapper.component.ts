import { Component, OnInit } from '@angular/core';
import { UserService } from '../../app_services/user.service';
import { User } from '../../app_models/user';
import { Task } from '../common/task';
import { TasksService } from '../common/tasks.service';
import { Filter } from '../common/filter';
import { FiltersService } from '../common/filters.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {
  filters: Filter[];
  tasks: Task[];

  jsonData;
  user = new User();


  constructor(private filtersService: FiltersService, private UserInfoService: UserService, private tasksService: TasksService) { }

  ngOnInit() {
    this.getFilters();
    this.getTasks();
    this.loadUser();

    this.jsonData = {
      userinfo: {
        name: 'Name',
        surname: 'Surname',
        position: 'position',
        managerName: 'Manager Has',
        managerSurname: 'Name',
        departament: 'Departament Has Name'
      }
    };
  }
  getFilters(): void {
    this.filtersService.getFilters()
      .subscribe(filters => this.filters = filters);
  }
  getTasks(): void {
    this.tasksService.getTasks()
      .subscribe(tasks => { this.tasks = tasks; } );
  }
  loadUser() {
    this.UserInfoService.getUser().subscribe(user => { this.user = user; });
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
          options: item.isCalendar ? this.updateDataFilterOptions(item.options, data.optionId) : item.options
        } : item
      );
    }
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
