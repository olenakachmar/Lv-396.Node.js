import { TestBed } from '@angular/core/testing';

import { DateService } from './date.service';

const mockDateItemsList = [
  {
    firstName: '',
    lastName: 'upcoming tasks',
    topic: 'upcoming date',
    date: '/profile',
  },
  {
    firstName: '',
    lastName: 'upcoming tasks',
    topic: 'upcoming date',
    date: '/profile',
  },
  {
    firstName: '',
    lastName: 'upcoming tasks',
    topic: 'upcoming date',
    date: '/profile',
  }
];

describe('DateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateService = TestBed.get(DateService);
    expect(service)
      .toBeTruthy();
  });
  it('should return items list', fakeAsync(inject([DateService], (service: DateService) => {
    service.setDateList()
      .subscribe(list => {
        expect(list)
          .toEqual(mockDateItemsList);
      });
  })));
});
