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

  ngOnInit() {
  }

  selectIt = (event: any) => {
    event.preventDefault();
  };

  selectedElement(event: any) {
    this.selected.emit(event.target.value);
  }

}
