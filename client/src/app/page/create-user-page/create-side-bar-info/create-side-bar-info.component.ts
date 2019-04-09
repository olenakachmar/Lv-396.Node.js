import {Component, OnInit} from '@angular/core';
import {IDepartment} from "../../../app_models/department";
import {DepartmentService} from "../../../app_services/department.service";
import {OptionPair} from "../../../app_models/option-pair";

@Component({
  selector: 'app-create-side-bar-info',
  templateUrl: './create-side-bar-info.component.html',
  styleUrls: ['./create-side-bar-info.component.scss']
})
export class CreateSideBarInfoComponent implements OnInit {

  public departmentsOptionPair: OptionPair[] = [];
  public departments: IDepartment[] = [];
  public positions: OptionPair[] = [];
  public departmentId: any;

  constructor(private departmentService: DepartmentService) {
  }

  retrieveSelected($event) {
    this.departmentId = $event;
    this.positions = this.departments.filter( elem => elem._id==$event)[0].position.map(e=>new OptionPair(e,e));
  }

  ngOnInit() {
    this.departmentService.getAllDepartments().subscribe(data => {
      this.departmentsOptionPair = data.map(o => new OptionPair(o._id, o.name));
      this.departments=data;
      // console.log(this.departments);
    });
  }

}