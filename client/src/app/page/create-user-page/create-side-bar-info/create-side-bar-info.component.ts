import { Component, OnInit } from '@angular/core';
import { IDepartment } from '../../../common/models/department';
import { DepartmentService } from '../../../common/services/department.service';
import { OptionPair } from '../../../common/models/option-pair';
import { UserService } from '../../../common/services/user.service';

@Component({
  selector: 'app-create-side-bar-info',
  templateUrl: './create-side-bar-info.component.html',
  styleUrls: ['./create-side-bar-info.component.scss']
})
export class CreateSideBarInfoComponent implements OnInit {

  departmentsOptionPair: OptionPair[] = [];
  departments: IDepartment[] = [];
  departmentId: any;
  positions: OptionPair[] = [];
  teamLeads: OptionPair[] = [];
  teamLeadId: any;
  roles: OptionPair[] = [];
  managers: OptionPair[] = [];
  positionId: string;


  constructor(readonly departmentService: DepartmentService, readonly userService: UserService) {
  }

  retrieveSelectedDepartment($event: any): void {
    this.departmentId = $event;
    this.positions = this.departments
      .filter(elem => elem._id === $event)[0].position
      .map(e => new OptionPair(e, e));
  }

  retrieveSelectedTeamleadId($event: any): void {
    this.teamLeadId = $event;
  }

  retrieveSelectedPosition($event: any): void {
    this.positionId = $event;
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
        this.roles = data.map(elem => new OptionPair(elem._id, elem.firstName));
        this.managers = data.map(elem => new OptionPair(elem._id, elem.position));
      });
  }

}
