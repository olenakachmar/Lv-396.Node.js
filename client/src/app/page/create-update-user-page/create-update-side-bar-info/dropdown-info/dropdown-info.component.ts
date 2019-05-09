import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { OptionPair } from '../../../../common/models/option-pair';
import { UserService } from '../../../../common/services/user.service';

@Component({
  selector: 'app-dropdown-info',
  templateUrl: './dropdown-info.component.html',
  styleUrls: ['./dropdown-info.component.scss']
})
export class DropdownInfoComponent implements OnInit, OnChanges {
  @Input() pairList: OptionPair[];
  @Output() readonly selected = new EventEmitter<any>();
  @Output() readonly selectedRoles = new EventEmitter<any>();
  @Input() required: boolean;
  title: string;
  @Input() positionIdentifier: string;
  @Input() update: string;
  @Input() roles: boolean;
  @Input() updateRolesList: string[];
  selectManagerRole: boolean;
  selectTeamleadRole: boolean;
  rolesList: string[] = [];


  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    if (!this.update) {
      this.title = 'Choose';
    }
    if (this.positionIdentifier === 'position') {
      this.userService.chosenDepartment.subscribe(() => {
        this.title = 'Choose';
      });
    }
    if (this.updateRolesList) {
      this.updateRolesList.map(elem => {
        elem === 'manager' ? this.selectManagerRole = true : this.selectTeamleadRole = true;
        });
      this.checkRolesForTitle();
    }
  }

  @HostListener('click') onClick() {
    this.checkRolesForTitle();
  }

  checkRolesForTitle(): void {
    if (this.selectManagerRole && this.selectTeamleadRole) {
      this.title = 'Teamlead & Manager';
    } else if (!this.selectManagerRole && !this.selectTeamleadRole) {
      this.title = 'Choose';
    } else if (this.selectManagerRole) {
      this.title = 'Manager';
    } else {
      this.title = 'Teamlead';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const checkedChangedValues = changes.pairList && changes.pairList.currentValue && changes.pairList.currentValue.length > 0;
    if (checkedChangedValues) {
      if (this.update) {
        this.title = changes.pairList.currentValue.find(elem => elem._id === this.update).name;
      }
    }
    if (changes.update && changes.update.currentValue) {
      if (this.pairList && this.pairList.length > 0) {
        this.title = this.pairList.find(elem => elem._id === this.update).name;
      }
    }
  }

  checkCheckbox(role) {
    if (role === 'manager') {
      this.selectManagerRole = !this.selectManagerRole;
      if (this.selectManagerRole) {
        this.rolesList.push(role);
      } else {
        this.rolesList = this.rolesList
          .filter(elem => elem !== role);
      }
    } else {
      this.selectTeamleadRole = !this.selectTeamleadRole;
      if (this.selectTeamleadRole) {
        this.rolesList.push(role);
      } else {
        this.rolesList = this.rolesList
          .filter(elem => elem !== role);
      }
    }
    this.selectedRoles.emit(this.rolesList);
  }

  selectIt = (pair: OptionPair, event: any) => {
    this.selected.emit(pair._id);
    event.preventDefault();
    if (pair.name) {
      this.title = pair.name;
    }
  };

}
