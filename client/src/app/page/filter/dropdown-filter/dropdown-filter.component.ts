import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss']
})
export class DropdownFilterComponent {
  @Input() filterItem: {isCalendar, defaultValue, options};
  @Input() id: number;
  @Input() cssClass: string;
  @Output() filterVal = new EventEmitter();
  title: string;
  options: [];

  constructor() { }

  ngOnInit() {
    this.options = this.filterItem.options;
    let titleObj: {name, value};
    titleObj = this.options.filter((item: {value, name}) => this.filterItem.defaultValue === item.value )[0];
    this.title = titleObj.name;
  }

  isSelected = (i) => {
    return this.filterItem.defaultValue === i ? 'active' : '';
  }

  selectIt = (i, event) => {
    this.filterVal.emit(i);
    event.preventDefault();
  }

}
