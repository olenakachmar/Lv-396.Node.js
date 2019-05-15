///<reference path="../../../../../node_modules/@angular/forms/src/model.d.ts"/>
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { DatesItem } from '../../common/dates-item';
import { DateService } from '../../common/date.service';

@Component({
  selector: 'app-create-update-date',
  templateUrl: './create-update-date.component.html',
  styleUrls: ['./create-update-date.component.scss']
})
export class CreateUpdateDateComponent implements OnInit {
  @Output() public readonly onDateChange = new EventEmitter<Date>();
  public addDatesForm: FormGroup;
  dates: string[];
  newDate: DatesItem[];
  dateFromDatepicker: string;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.newDate = [];
    this.addDatesForm = this.fb.group({
      datesCount: this.fb.array([
        {
          topic: 'Upcoming review date',
          date: [''],
        },
        this.initDates(),
      ])
    });
  }

  initDates(): any {
    return this.fb.group({
      topic: [''],
      date: [''],
    });
  }

  addDate(): void {
    const control = this.addDatesForm.controls.datesCount as FormArray;
    control.push(this.initDates());
    console.log(control);
  }
  removeDate(i: number): void {
    const control = this.addDatesForm.controls.datesCount as FormArray;
    control.removeAt(i);
  }

  save(): void {}

  onValueChange(value: Date): void {
    this.onDateChange.emit(value);
  }
  checkFirstElement(i: number): boolean{
    return i === 0;
  }

}
