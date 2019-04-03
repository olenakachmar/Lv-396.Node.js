import { Component, OnInit } from '@angular/core';
import { UserService } from '../../app_services/user.service';
import { User } from '../../app_models/user';
import { Task } from '../../page/common/task';
import { TasksService } from '../../page/common/tasks.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {
tasks: Task[];

  jsonData;
  user = new User();


  constructor(private UserInfoService: UserService, private tasksService: TasksService) { }


  ngOnInit() {

    this.loadUser();
    this.jsonData = {
      userinfo: {
        name: 'Name',
        surname: 'Surname',
        position: 'position',
        managerName: 'Manager Has',
        managerSurname: 'Name',
        departament: 'Departament Has Name'
      },
      filters: [
        {
          name: 'type',
          isCalendar: false,
          defaultValue: -1,
          options: [
            { name: 'Show all tasks', value: -1 },
            { name: 'Show delegates tasks only', value: 0 },
            { name: 'Show issues only', value: 1 },
          ],
        },
        {
          name: 'status',
          isCalendar: false,
          defaultValue: -1,
          options: [
            { name: 'Filter by Status', value: -1 },
            { name: 'High', value: 0 },
            { name: 'Normal', value: 1 },
            { name: 'Low', value: 2 },
          ],
        }
      ]
    };
    this.getTasks();
  }
  loadUser() {
    this.UserInfoService.getUser().subscribe(user => { this.user = user; });
  }

  filterGrids = () => {
    return this.jsonData.filters.length ? ('filter-col-' + this.jsonData.filters.length) : '';
  }

  selectFilterOption = (data: any) => {
    if (this.jsonData.filters.length) {
      this.jsonData.filters = this.jsonData.filters.map(
          (item, index) => index === data.filterId ? {
            name: item.name,
            isCalendar: item.isCalendar,
            defaultValue: data.optionId,
            options: item.options
          } : item
      );
    }
  }
  getTasks(): void {
    this.tasksService.getTasks()
      .subscribe(tasks => {this.tasks = tasks; } );
  }

}
