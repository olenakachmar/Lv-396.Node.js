import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  @Output() public onDateChange: EventEmitter<Date>;
  public datepickerModel: Date;
  constructor() { 
  }

  ngOnInit() {
    this.onDateChange = new EventEmitter<Date>();
  }

  onValueChange(value: Date): void {
    this.onDateChange.emit(value);
  }

}
