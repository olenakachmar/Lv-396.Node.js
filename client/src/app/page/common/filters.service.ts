import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Filter } from './filter';
import { FILTERS } from './mock-filters';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  constructor() { }

  getFilters(): Observable<Filter[]> {
    return of(FILTERS);
  }
}
