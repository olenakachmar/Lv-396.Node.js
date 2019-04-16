import { Component, OnInit } from '@angular/core';
import { Filter } from '../common/filter';
import { FilterReturnService } from '../common/filter-return.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  providers: [ FilterReturnService ],
  styleUrls: ['./add-task-form.component.scss']
})
export class AddTaskFormComponent implements OnInit {
  theFilter: Filter;
  dropDownCssClassName: string;

  addTaskForm = this.fb.group({
    taskName: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]
    ],
    taskSummary: [
      '',
      [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(40)
      ],
    ],
    taskDescription: [
      '',
      Validators.maxLength(400),
    ]
  });

  get taskName(): any {
    return this.addTaskForm.get('taskName');
  }

  get taskSummary(): any {
    return this.addTaskForm.get('taskSummary');
  }

  get taskDescription(): any {
    return this.addTaskForm.get('taskDescription');
  }

  constructor(
    private readonly filterReturnService: FilterReturnService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): any {
    this.dropDownCssClassName = 'width-100';
    this.getTheFilter();
  }

  getFilterVal = (i: number, data: number) => {
    this.theFilter.defaultValue = data;
  };

  getTheFilter(): void {
    this.theFilter = this.filterReturnService.createFilterByName('status', 1);
  }

  onSubmit(): void {
    const result: [any, any] = [
      this.addTaskForm.value,
      this.theFilter.defaultValue
    ];
  }

}
