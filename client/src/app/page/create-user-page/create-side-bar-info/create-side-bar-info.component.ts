import { Component, OnInit } from '@angular/core';
import { Department } from '../../../app_models/department';
import data from '../../../../assets/data/data.json';

@Component({
  selector: 'app-create-side-bar-info',
  templateUrl: './create-side-bar-info.component.html',
  styleUrls: ['./create-side-bar-info.component.scss']
})
export class CreateSideBarInfoComponent implements OnInit {

  departments: Department[] = data;

  constructor() { }

  ngOnInit() { }

}
