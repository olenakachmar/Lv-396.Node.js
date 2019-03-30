import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss']
})
export class DropdownFilterComponent implements OnInit {
  @Input() filterItem: {isCalendar, defaultValue, options };
  @Input() id: number;
  @Input() cssClassName: string;
  @Output() filterVal = new EventEmitter();
  title: string;

  constructor() { }

  ngOnInit() {
    let titleObj: {name, value};
    titleObj = this.filterItem.options.filter(
        (item: {value, name}) => this.filterItem.defaultValue === item.value )[0];
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
