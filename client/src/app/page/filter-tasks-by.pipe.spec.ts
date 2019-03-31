import { FilterTasksByPipe } from './filter-tasks-by.pipe';

import { Filter } from './common/filter';
import { Task } from './common/task';

describe('FilterTasksByPipe', () => {
  let filters: Filter[];
  const tasks: Task[] = [
    {
      id: 0,
      name: '',
      excerpt: '',
      status: { name: 'LOW', value: 2 },
      type: { name: 'issue', value: 1 },
      date: '22/03/2019',
      author: '',
      content: '',
    },
    {
      id: 1,
      name: '',
      excerpt: '',
      status: { name: 'HIGHT', value: 0 },
      type: { name: 'issue', value: 1 },
      date: '23/03/2019',
      author: '',
      content: '',
    },
    {
      id: 2,
      name: '',
      excerpt: '',
      status: { name: 'LOW', value: 2 },
      type: { name: 'task', value: 0 },
      date: '24/03/2019',
      author: '',
      content: '',
    },
    {
      id: 3,
      name: '',
      excerpt: '',
      status: { name: 'NORMAL', value: 1 },
      type: { name: 'task', value: 0 },
      date: '25/03/2019',
      author: '',
      content: '',
    },
    {
      id: 4,
      name: '',
      excerpt: '',
      status: { name: 'LOW', value: 2 },
      type: { name: 'task', value: 0 },
      date: '26/03/2019',
      author: '',
      content: '',
    }
  ];

  it('create an instance', () => {
    const pipe = new FilterTasksByPipe();
    expect(pipe).toBeTruthy();
  });

  it('if there is no filters return all tasks', () => {
    const pipe = new FilterTasksByPipe();
    filters = [];
    expect(pipe.transform(tasks, filters)).toBe(tasks);
  });

  it('if all filters set on show all option return all tasks', () => {
    const pipe = new FilterTasksByPipe();
    filters = [
      {
        id: 0,
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
        id: 1,
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
    ];
    expect(pipe.transform(tasks, filters)).toBe(tasks);
  });

  it('filter tasks by status HIGHT', () => {
    const pipe = new FilterTasksByPipe();
    filters = [
      {
        id: 0,
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
        id: 1,
        name: 'status',
        isCalendar: false,
        defaultValue: 0,
        options: [
          { name: 'Filter by Status', value: -1 },
          { name: 'High', value: 0 },
          { name: 'Normal', value: 1 },
          { name: 'Low', value: 2 },
        ],
      }
    ];
    expect(pipe.transform(tasks, filters)).toEqual(tasks.filter(item => item.id === 1));
  });

  it('filter tasks by status LOW and type TASK', () => {
    const pipe = new FilterTasksByPipe();
    filters = [
      {
        id: 0,
        name: 'type',
        isCalendar: false,
        defaultValue: 0,
        options: [
          { name: 'Show all tasks', value: -1 },
          { name: 'Show delegates tasks only', value: 0 },
          { name: 'Show issues only', value: 1 },
        ],
      },
      {
        id: 1,
        name: 'status',
        isCalendar: false,
        defaultValue: 2,
        options: [
          { name: 'Filter by Status', value: -1 },
          { name: 'High', value: 0 },
          { name: 'Normal', value: 1 },
          { name: 'Low', value: 2 },
        ],
      }
    ];
    const expectedResult: Task[] = [
      {
        id: 2,
        name: '',
        excerpt: '',
        status: { name: 'LOW', value: 2 },
        type: { name: 'task', value: 0 },
        date: '24/03/2019',
        author: '',
        content: '',
      },
      {
        id: 4,
        name: '',
        excerpt: '',
        status: { name: 'LOW', value: 2 },
        type: { name: 'task', value: 0 },
        date: '26/03/2019',
        author: '',
        content: '',
      }
    ];
    expect(pipe.transform(tasks, filters)).toEqual(expectedResult);
  });

  it('filter tasks by status LOW and type ISSUE', () => {
    const pipe = new FilterTasksByPipe();
    filters = [
      {
        id: 0,
        name: 'type',
        isCalendar: false,
        defaultValue: 1,
        options: [
          { name: 'Show all tasks', value: -1 },
          { name: 'Show delegates tasks only', value: 0 },
          { name: 'Show issues only', value: 1 },
        ],
      },
      {
        id: 1,
        name: 'status',
        isCalendar: false,
        defaultValue: 2,
        options: [
          { name: 'Filter by Status', value: -1 },
          { name: 'High', value: 0 },
          { name: 'Normal', value: 1 },
          { name: 'Low', value: 2 },
        ],
      }
    ];
    const expectedResult: Task[] = [
      {
        id: 0,
        name: '',
        excerpt: '',
        status: { name: 'LOW', value: 2 },
        type: { name: 'issue', value: 1 },
        date: '22/03/2019',
        author: '',
        content: '',
      }
    ];
    expect(pipe.transform(tasks, filters)).toEqual(expectedResult);
  });

  it('filter tasks by status NORMAL and any type', () => {
    const pipe = new FilterTasksByPipe();
    filters = [
      {
        id: 0,
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
        id: 1,
        name: 'status',
        isCalendar: false,
        defaultValue: 1,
        options: [
          { name: 'Filter by Status', value: -1 },
          { name: 'High', value: 0 },
          { name: 'Normal', value: 1 },
          { name: 'Low', value: 2 },
        ],
      }
    ];
    const expectedResult: Task[] = [
      {
        id: 3,
        name: '',
        excerpt: '',
        status: { name: 'NORMAL', value: 1 },
        type: { name: 'task', value: 0 },
        date: '25/03/2019',
        author: '',
        content: '',
      }
    ];
    expect(pipe.transform(tasks, filters)).toEqual(expectedResult);
  });

  it('filter tasks by status NORMAL and type ISSUE', () => {
    const pipe = new FilterTasksByPipe();
    filters = [
      {
        id: 0,
        name: 'type',
        isCalendar: false,
        defaultValue: 1,
        options: [
          { name: 'Show all tasks', value: -1 },
          { name: 'Show delegates tasks only', value: 0 },
          { name: 'Show issues only', value: 1 },
        ],
      },
      {
        id: 1,
        name: 'status',
        isCalendar: false,
        defaultValue: 1,
        options: [
          { name: 'Filter by Status', value: -1 },
          { name: 'High', value: 0 },
          { name: 'Normal', value: 1 },
          { name: 'Low', value: 2 },
        ],
      }
    ];
    expect(pipe.transform(tasks, filters).length).toEqual(0);
  });

  it('filter tasks by status NORMAL and type TASK', () => {
    const pipe = new FilterTasksByPipe();
    filters = [
      {
        id: 0,
        name: 'type',
        isCalendar: false,
        defaultValue: 0,
        options: [
          { name: 'Show all tasks', value: -1 },
          { name: 'Show delegates tasks only', value: 0 },
          { name: 'Show issues only', value: 1 },
        ],
      },
      {
        id: 1,
        name: 'status',
        isCalendar: false,
        defaultValue: 1,
        options: [
          { name: 'Filter by Status', value: -1 },
          { name: 'High', value: 0 },
          { name: 'Normal', value: 1 },
          { name: 'Low', value: 2 },
        ],
      }
    ];
    expect(pipe.transform(tasks, filters)).toEqual(tasks.filter(item => item.id === 3));
  });
});
