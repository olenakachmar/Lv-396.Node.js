import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Options } from '../../common/filter-options';
import { Filter } from '../../common/filter';
import { DropDownService } from '../../common/drop-down.service';

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss']
})
export class DropdownFilterComponent implements OnInit {
  @Input() filterItem: Filter;
  @Input() cssClassName: string;
  @Output() readonly filterVal = new EventEmitter();
  @ViewChild('dropDownWrapper') dropDownWrapperView: ElementRef;
  options: Options[];
  title: string;
  dropDownPositionClassNames: any;

  constructor(private readonly dropDownService: DropDownService) {}

  ngOnInit(): void {
    this.options = this.filterItem.options;
    let titleObj: {
      name: string,
      value: any
    };
    titleObj = this.filterItem.options.filter((item: {name: string, value: any}) => this.filterItem.defaultValue === item.value)[0];
    this.title = titleObj.name;
    this.getDropDownPositionClassNames();
  }

  selectIt = (i, event) => {
    this.filterVal.emit(i);
    event.preventDefault();
  };

  getDropDownPositionClassNames(): void {
    this.dropDownService.checkDropDownElPosition(this.dropDownWrapperView)
      .subscribe(cssClassNames => {
        this.dropDownPositionClassNames = cssClassNames;
    });
  }

  trackElement(index: number, element: any): any {
    return element ? element.guid : 0;
  }

}
