import { Injectable } from '@angular/core';
import { NavItem } from './nav-item';
import { NAVBAR_LIST } from './mock-nav-items';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavItemsService {
  getNavList(): Observable<NavItem[]> {
    return of(NAVBAR_LIST);
  }
}
