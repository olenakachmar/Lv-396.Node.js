import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IDepartment } from '../../../app_models/department';
import { DepartmentService } from '../../../app_services/department.service';
import { OptionPair } from '../../../app_models/option-pair';
import { UserService } from '../../../app_services/user.service';

@Component({
  selector: 'app-create-side-bar-info',
  templateUrl: './create-side-bar-info.component.html',
  styleUrls: ['./create-side-bar-info.component.scss']
})
export class CreateSideBarInfoComponent implements OnInit {

  @Output() readonly getUserBarInfo = new EventEmitter();

  departmentsOptionPair: OptionPair[] = [];
  departments: IDepartment[] = [];
  departmentId: any;
  positions: OptionPair[] = [];
  positionId: string;
  teamLeads: OptionPair[] = [];
  teamLeadId: any;
  roles: OptionPair[] = [];
  role: string;
  managers: OptionPair[] = [];
  managerId: any;


  constructor(readonly departmentService: DepartmentService, readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.departmentService.getAllDepartments()
      .subscribe(data => {
        this.departmentsOptionPair = data.map(o => new OptionPair(o._id, o.name));
        this.departments = data;
      });

    this.userService.getAll()
      .subscribe(data => {
        this.teamLeads = data
          .map(elem => new OptionPair(elem._id, `${elem.firstName} ${elem.lastName}`));
        this.roles = ['Developer', 'Tester', 'HR'].map(elem => new OptionPair(elem, elem));
        this.managers = data.map(elem => new OptionPair(elem._id, elem.position));
      });
  }

  retrieveSelected(type: string, $event: any): void {
    switch (type) {
      case 'Department':
        this.departmentId = $event;
        this.positions = this.departments
          .filter(elem => elem._id === $event)[0].position
          .map(e => new OptionPair(e, e));
        break;
      case 'TeamLead':
        this.teamLeadId = $event;
        break;
      case 'Position':
        this.positionId = $event;
        break;
      case 'Role':
        this.role = $event;
        break;
      case 'Manager':
        this.managerId = $event;
        break;
      default:
        break;
    }
    this.passData();
  }

  passData(): any {
    return {
      positionID: this.positionId,
      departmentID: this.departmentId,
      managerID: this.managerId,
      teamleadID: this.teamLeadId,
      role: this.role
    };
  }
}
