import {Component, OnInit} from '@angular/core';
// import {DepartmentService} from "../../app_services/department.service";
// import {Department} from "../../app_models/department";


@Component({
  selector: 'app-create-user-page',
  templateUrl: './create-user-page.component.html',
  styleUrls: ['./create-user-page.component.scss']
})
export class CreateUserPageComponent implements OnInit {

  // department: Department;

  constructor(
    // private departmentService: DepartmentService
  ) {
  }

  ngOnInit() {
    // this.departmentService.getDepartmentById(123).subscribe(d => this.department = d);
  }

}
