import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OptionPair } from '../../../../app_models/option-pair';

@Component({
  selector: 'app-dropdown-info',
  templateUrl: './dropdown-info.component.html',
  styleUrls: ['./dropdown-info.component.scss']
})
export class DropdownInfoComponent implements OnInit {
  @Input() pairList: OptionPair[];
  @Output() readonly selected = new EventEmitter<any>();
  title: string;

  ngOnInit(): void {
    this.title = 'Choose';
  }

  selectIt = (pair: OptionPair, event: any) => {
    this.selected.emit(pair._id);
    event.preventDefault();
    if (pair.name) {
      this.title = pair.name;
    }
  };

}
