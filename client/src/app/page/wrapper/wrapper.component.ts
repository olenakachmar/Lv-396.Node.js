import { Component, OnInit } from '@angular/core';
import { Task} from '../common/task';
import { UserService } from '../../app_services/user.service';
import { User } from '../../app_models/user';


@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  jsonData;
  item: Task = new Task();
  // item: TaskInterface [];
    // = new Task(0, '', '', {name: '', value: ''}, {name: '', value: ''}, '', '', '');
  user = new User();


  constructor(private UserInfoService: UserService) { }

  ngOnInit() {

    this.loadUser();
    this.jsonData = {
      tasks: [
        {
          id: 1,
          name: 'Upcoming task name',
          excerpt: 'This content is straight in the template.',
          status: { name: 'LOW', value: 2 },
          type: { name: 'issue', value: 1 },
          date: '22/03/2019',
          author: 'Alex Somename',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
              'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ' +
              'ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis',
        },
        {
          id: 2,
          name: 'Upcoming task name2',
          excerpt: 'This content is straight in the template2.',
          status: { name: 'HIGHT', value: 0 },
          type: { name: 'issue', value: 1 },
          date: '23/03/2019',
          author: 'Alex3 Somename',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
              'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ' +
              'ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis',
        },
        {
          id: 3,
          name: 'Upcoming task name3',
          excerpt: 'This content is straight in the template3.',
          status: { name: 'LOW', value: 2 },
          type: { name: 'task', value: 0 },
          date: '24/03/2019',
          author: 'Alex2 Somename',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
              'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ' +
              'exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis',
        },
        {
          id: 4,
          name: 'Upcoming task name4',
          excerpt: 'This content is straight in the template4.',
          status: { name: 'NORMAL', value: 1 },
          type: { name: 'task', value: 0 },
          date: '25/03/2019',
          author: 'Alex1 Somename',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
              'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ' +
              'exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis',
        },
        {
          id: 5,
          name: 'Upcoming task name5',
          excerpt: 'This content is straight in the template5.',
          status: { name: 'LOW', value: 2 },
          type: { name: 'task', value: 0 },
          date: '26/03/2019',
          author: 'Alex2 Somename',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
              'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ' +
              'exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis',
        }
      ],
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
}
