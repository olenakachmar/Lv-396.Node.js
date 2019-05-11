import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-update-date',
  templateUrl: './create-update-date.component.html',
  styleUrls: ['./create-update-date.component.scss']
})
export class CreateUpdateDateComponent implements OnInit {
  dates: string[];

  addDatesForm = this.fb.group({
    dateName: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]
    ],
    datesCount: this.fb.group({
    })
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.dates = [];
  }

  addDate(): void {
    const item = `date-${this.dates.length}`;
    this.getDate.addControl(item, new FormControl('', [Validators.required]));
    this.dates = [...this.dates, item];
  }

  removeDate(control: string): void {
    this.getDate.removeControl(control) ;
    this.dates.pop();
  }

  get getDate(): any {
    return this.addDatesForm.get('datesCount') as FormGroup;
  }
}
