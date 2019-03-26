import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() filters: [];
  @Input() cssClass: string;
  @Output() getFilter = new EventEmitter();

  constructor() { }
  ngOnInit() {}

  makeFullWidth = () => {
    return this.cssClass.length ? 'width-100' : '';
  }
}
