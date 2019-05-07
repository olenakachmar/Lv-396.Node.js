import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { OptionPair } from '../../../../common/models/option-pair';
import { UserService } from '../../../../common/services/user.service';

@Component({
  selector: 'app-dropdown-info',
  templateUrl: './dropdown-info.component.html',
  styleUrls: ['./dropdown-info.component.scss']
})
export class DropdownInfoComponent implements OnInit, OnChanges {
  @Input() pairList: OptionPair[];
  @Output() readonly selected = new EventEmitter<any>();
  @Input() required: boolean;
  title: string;
  @Input() positionIdentifier: string;
  @Input() update: string;
  @Input() roles: boolean;
  active: boolean;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    if (!this.update) {
      this.title = 'Choose';
    }
    if (this.positionIdentifier === 'position') {
      this.userService.chosenDepartment.subscribe(() => {
        this.title = 'Choose';
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const checkedChangedValues = changes.pairList && changes.pairList.currentValue && changes.pairList.currentValue.length > 0;
    if (checkedChangedValues) {
      if (this.update) {
        this.title = changes.pairList.currentValue.find(elem => elem._id === this.update).name;
      }
    }

    if (changes.update && changes.update.currentValue) {
      if (this.pairList && this.pairList.length > 0) {
        this.title = this.pairList.find(elem => elem._id === this.update).name;
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

  @HostListener('mouseleave') onMouseLeave(): void {
    this.active = false;
  }

}
