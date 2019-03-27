import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],

})
export class AccordionComponent implements OnInit {
  @Input() items: [];
  isContentOpen: boolean = false;
  constructor() { }

  ngOnInit() { }


}
