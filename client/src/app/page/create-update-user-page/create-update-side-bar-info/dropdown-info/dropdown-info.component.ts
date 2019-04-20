import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {OptionPair} from '../../../../common/models/option-pair';

@Component({
  selector: 'app-dropdown-info',
  templateUrl: './dropdown-info.component.html',
  styleUrls: ['./dropdown-info.component.scss']
})
export class DropdownInfoComponent implements OnInit, OnChanges {
  title: string;

  @Input() pairList: OptionPair[];
  @Input() selectedId: any;

  @Output() readonly selected = new EventEmitter<any>();

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pairList && changes.pairList.currentValue && changes.pairList.currentValue.length > 0) {
      if (this.selectedId) {
        this.title = changes.pairList.currentValue.find(elem => elem._id === this.selectedId).name;
      }
    }

    if (changes.selectedId && changes.selectedId.currentValue) {
      if (this.pairList && this.pairList.length > 0) {
        this.title = this.pairList.find(elem => elem._id === this.selectedId).name;
      }
    }
  }

  selectIt = (pair: OptionPair, event: any) => {
    this.selected.emit(pair._id);
    event.preventDefault();
    if (pair.name) {
      this.title = pair.name;
    }
  };

}
