import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../app_services/department.service';
import { Department } from "../../../app_models/department";

@Component({
  selector: 'app-create-side-bar-info',
  templateUrl: './create-side-bar-info.component.html',
  styleUrls: ['./create-side-bar-info.component.scss']
})
export class CreateSideBarInfoComponent implements OnInit {

  departments: Department = new Department();

  constructor( private departmentService: DepartmentService ) { }

  ngOnInit() {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService.getAllDepartments().subscribe(departments => { this.departments = departments; });
  }

}
