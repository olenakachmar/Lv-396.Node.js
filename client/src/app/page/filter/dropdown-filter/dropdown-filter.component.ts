import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Filter } from '../../common/filter';
import { DropDownService } from '../../common/drop-down.service';

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss']
})
export class DropdownFilterComponent implements OnInit {
  @Input() filterItem: Filter;
  @Input() id: number;
  @Input() cssClassName: string;
  @Output() filterVal = new EventEmitter();
  @ViewChild('dropDownWrapper') dropDownWrapperView: ElementRef;
  title: string;
  dropDownPositionClassNames: any;

  constructor(private dropDownService: DropDownService) { }

  ngOnInit() {
    let titleObj: {name, value};
    titleObj = this.filterItem.options.filter((item: {value, name}) => this.filterItem.defaultValue === item.value )[0];
    this.title = titleObj.name;
    this.getDropDownPositionClassNames();
  }

  isSelected = (i) => {
    return this.filterItem.defaultValue === i ? 'active' : '';
  }

  selectIt = (i, event) => {
    this.filterVal.emit(i);
    event.preventDefault();
  }

  getDropDownPositionClassNames(): void {
    this.dropDownService.checkDropDownElPosition(this.dropDownWrapperView).subscribe(cssClassNames => {
      this.dropDownPositionClassNames = cssClassNames;
    });
  }

}
