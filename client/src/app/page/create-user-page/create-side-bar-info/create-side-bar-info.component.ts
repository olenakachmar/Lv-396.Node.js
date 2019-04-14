import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IDepartment } from '../../../app_models/department';
import { DepartmentService } from '../../../app_services/department.service';
import { OptionPair } from '../../../app_models/option-pair';
import { UserService } from '../../../app_services/user.service';
import { User } from '../../../app_models/user';

@Component({
  selector: 'app-create-side-bar-info',
  templateUrl: './create-side-bar-info.component.html',
  styleUrls: ['./create-side-bar-info.component.scss']
})
export class CreateSideBarInfoComponent implements OnInit {

  newUser = new User();

  @Output() readonly getUserBarInfo = new EventEmitter();

  departmentsOptionPair: OptionPair[] = [];
  departments: IDepartment[] = [];
  positions: OptionPair[] = [];
  teamLeads: OptionPair[] = [];
  roles: OptionPair[] = [];
  managers: OptionPair[] = [];


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
        this.newUser.department = $event;
        this.positions = this.departments
          .filter(elem => elem._id === $event)[0].position
          .map(e => new OptionPair(e, e));
        break;
      case 'TeamLead':
        this.newUser.teamlead = $event;
        break;
      case 'Position':
        this.newUser.position = $event;
        break;
      case 'Role':
        this.newUser.role = $event;
        break;
      case 'Manager':
        this.newUser.manager = $event;
        break;
      default:
        break;
    }
  }
}
