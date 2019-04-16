import { Component, OnInit } from '@angular/core';
import { Filter } from '../common/filter';
import { FilterReturnService } from '../common/filter-return.service';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  providers: [ FilterReturnService ],
  styleUrls: ['./add-task-form.component.scss']
})
export class AddTaskFormComponent implements OnInit {
  theFilter: Filter;
  dropDownCssClassName: string;

  constructor(
    private readonly filterReturnService: FilterReturnService
  ) { }

  ngOnInit(): any {
    this.dropDownCssClassName = 'width-100';
    this.getTheFilter();
  }

  sendFilterVal = (i: number, data: number) => {
    this.theFilter.defaultValue = data;
  };

  getTheFilter(): void {
    this.theFilter = this.filterReturnService.createFilterByName('status', 1);
  }

}
