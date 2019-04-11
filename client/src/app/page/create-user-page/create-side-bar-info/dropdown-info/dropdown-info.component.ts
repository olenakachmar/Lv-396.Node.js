import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OptionPair} from "../../../../app_models/option-pair";

@Component({
  selector: 'app-dropdown-info',
  templateUrl: './dropdown-info.component.html',
  styleUrls: ['./dropdown-info.component.scss']
})
export class DropdownInfoComponent implements OnInit {
  @Input() pairList: OptionPair[];
  @Output() selected = new EventEmitter<any>();


  constructor() {
  }

  ngOnInit() {
  }

  selectIt = (event) => {
    event.preventDefault();
  };

  selectedElement(event) {
    this.selected.emit(event.target.value);
  }

}
