import { Component, OnInit } from '@angular/core';
import { Filter } from './common/filter';
import { FiltersService } from './common/filters.service';
import { Task } from './common/task';
import { TasksService } from './common/tasks.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  filters: Filter[];
  tasks: Task[];

  jsonData;

  constructor(private filtersService: FiltersService, private tasksService: TasksService) { }

  ngOnInit() {
    this.getFilters();
    this.getTasks();
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
            options: item.options
          } : item
      );
    }
  }
}
