import { TestBed } from '@angular/core/testing';

import { FilterReturnService } from './filter-return.service';

describe('FilterReturnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterReturnService = TestBed.get(FilterReturnService);
    expect(service).toBeTruthy();
  });
});
