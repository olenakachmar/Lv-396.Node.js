import { Injectable, ElementRef } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropDownService {

  constructor() { }

  checkDropDownElPosition(el: ElementRef): Observable<string> {
    return new Observable(observer => {
      const wrapperEl = el.nativeElement;
      const mutationObserver = new MutationObserver(mutations => {
          observer.next(this.changeDropDownPosition(mutations[0].addedNodes[0], wrapperEl));
          observer.complete();
        }
      );
      mutationObserver.observe(wrapperEl, {
        childList: true
      });
    });
  }

   private changeDropDownPosition = (dropDownEl, wrapperEl) => {
    let cssClassName = '';
    if ( this.isSpaceBelowElSmallerElHeight(dropDownEl, wrapperEl)) {
      const isSmaller = this.isSpaceBelowElSmallerElHeight(dropDownEl, wrapperEl, true);
      cssClassName = (isSmaller) ? ' full-top' : ' popup-to-left half-top';
    }
    return cssClassName;
  }

  private isSpaceBelowElSmallerElHeight = (dropDownEl, wrapperEl, getHeightHalf = false) => {
    const heightBelow = this.offsetBelowEl(wrapperEl);
    const height = (getHeightHalf) ? (dropDownEl.offsetHeight / 2) : dropDownEl.offsetHeight;
    return heightBelow <= height;
  }

  private offsetBelowEl = (el) => {
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return document.documentElement.offsetHeight - (rect.top + scrollTop + el.offsetHeight);
  }
}
