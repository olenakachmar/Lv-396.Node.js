import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { User } from '../../../app_models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss']
})
export class UserFilterComponent implements OnInit {

  filterText: string;
  @Output() getFilterText = new EventEmitter;
  @Input() users: User[];
  message: string;
  id: any;

  constructor(private readonly route: ActivatedRoute) {
    this.message = '';
  }

  getDepartmentId(): string {
    this.message = this.id;
    return this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }

  onGetFilterText() {
    this.getFilterText.emit(this.filterText);
  }

}
