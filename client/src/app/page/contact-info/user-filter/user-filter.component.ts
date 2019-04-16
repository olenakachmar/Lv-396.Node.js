import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { User } from '../../../common/models/user';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss']
})
export class UserFilterComponent implements OnInit {

  filterText: string;
  @Output() getFilterText = new EventEmitter;
  @Input() users: User[];

  constructor() { }

  ngOnInit() {
  }

  onGetFilterText() {
    this.getFilterText.emit(this.filterText);
  }

}
