import { Component, OnInit, Input } from '@angular/core';

import { Task } from '../../../common/task';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item: Task;

  constructor() { }

  ngOnInit() {
  }

}
