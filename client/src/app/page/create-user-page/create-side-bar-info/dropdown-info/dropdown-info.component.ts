import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OptionPair } from "../../../../app_models/option-pair";

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

  selectedElement(event){
    this.selected.emit(event.target.value);
  }

}
