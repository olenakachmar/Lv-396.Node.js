import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponent } from './filter.component';
import { DropdownFilterComponent } from './dropdown-filter/dropdown-filter.component';

import { Filter } from '../common/filter';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  const filters: Filter[] = [
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
  const cssClass = 'filter-col-2';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterComponent,
        DropdownFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    component.filters = filters;
    component.cssClass = cssClass;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
