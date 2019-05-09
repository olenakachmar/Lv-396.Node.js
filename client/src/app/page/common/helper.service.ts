import { Injectable } from '@angular/core';
import { DatesItem } from './dates-item';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  public readonly sortList = (list): void => {
    list.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }

      return 0;
    });
  };
}
