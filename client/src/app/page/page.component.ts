import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  jsonData;

  constructor() { }

  ngOnInit() {
    this.jsonData = {
      menuRight: [
        {
          id: 1,
          href: '#1',
          title: 'Log Out',
          isCurrent: false,
        },
        {
          id: 2,
          href: '#2',
          title: 'Edit Profile',
          isCurrent: false,
        }
      ],
      menuBurger: [
        {
          id: 1,
          href: '#1',
          title: 'upcoming tasks',
          isCurrent: true,
        },
        {
          id: 2,
          href: '#2',
          title: 'contact info',
          isCurrent: false,
        },
        {
          id: 3,
          href: '#3',
          title: 'my profile',
          isCurrent: false,
        },
        {
          id: 4,
          href: '#4',
          title: 'create user',
          isCurrent: false,
        }
      ],
      userinfo: {
        name: 'Name',
        surname: 'Surname',
        position: 'position',
        managerName: 'Manager Has',
        managerSurname: 'Name',
        departament: 'Departament Has Name'
      },
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
