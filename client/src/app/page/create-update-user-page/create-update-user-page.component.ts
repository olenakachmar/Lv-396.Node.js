import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import { User } from '../../common/models/user';
import { Subject } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-update-user-page',
  templateUrl: './create-update-user-page.component.html',
  styleUrls: ['./create-update-user-page.component.scss']
})
export class CreateUpdateUserPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  user: User = new User();
  ifChosenDevelopmentDepartment: boolean;
  ifChosenHrDepartment: boolean;
  notValidUser: boolean;
  create: boolean;
  requiredForCreationUserFields: any[];

  constructor(readonly userService: UserService,
              private readonly router: Router,
              private  route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.notValidUser = false;
    this.route.paramMap.subscribe(parameterMap => {
      const id = parameterMap.get('id');

      this.getEmployee(id);
    });

    this.deleteNotValidValuesFromUserObjectOnDepartmentChoose();
  }

  private getEmployee(id: string): void {
    if (id) {
      this.userService.getUser(id)
        .subscribe(user => {
          this.user = user;
        });
    } else {
      this.create = true;
    }
  }

  extractUser(user, chosenDevelopmentDepartment, chosenHrDepartment): any {
    this.user = user;
    this.ifChosenDevelopmentDepartment = chosenDevelopmentDepartment;
    this.ifChosenHrDepartment = chosenHrDepartment;

    this.user.phone = '35839946448845';
    this.user.email = 'trley@gmail.com';
    this.user.roles = ['Teamlead', 'Manager'];

    if (this.validateUser()) {
      if (this.user._id) {
        this.userService.updateUser(this.user)
          .takeUntil(this.destroy$)
          .subscribe((data: any) => {
            this.router.navigate(['/profile/my-profile/', this.user._id], {relativeTo: this.route});
          });
      } else {
        this.userService.addUser(this.user)
          .takeUntil(this.destroy$)
          .subscribe((data: any) => {
            this.router.navigate(['/profile/my-profile/', data.newUser._id], {relativeTo: this.route});
          });
      }
    } else {
      this.notValidUser = true;
    }
  }

  validateUser(): boolean {

    this.user.type = this.ifChosenHrDepartment ? 'hr' : 'developer';

    this.requiredForCreationUserFields = [this.user.firstName, this.user.lastName, this.user.department,
                                          this.user.position, this.user.hr, this.user.manager];

    if (this.ifChosenDevelopmentDepartment) {
      this.requiredForCreationUserFields = [...this.requiredForCreationUserFields, this.user.teamlead];

    }
    let requiredField = true;
    this.requiredForCreationUserFields.map(elem => {
      if (!elem) {
        requiredField = false;
      }
    });

    return requiredField;

  }

  deleteNotValidValuesFromUserObjectOnDepartmentChoose(): void {
    this.userService.chosenDepartment.subscribe(() => {
      delete this.user.teamlead;
      delete this.user.position;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}


