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

  newUser: User = new User();
  ifChosenDevelopmentDepartment: boolean;
  ifChosenHrDepartment: boolean;
  notValidUser: boolean;
  existedUser: boolean;
  gotUser: boolean;
  create: boolean;

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
  }

  private getEmployee(id: string): void {
    if (id) {
      this.userService.getUser(id)
        .subscribe(user => {
          this.newUser = user;
          this.gotUser = true;
        });
    } else {
      this.create = true;
    }
  }

  extractUser(user, chosenDevelopmentDepartment, chosenHrDepartment): any {
    this.newUser = user;
    this.ifChosenDevelopmentDepartment = chosenDevelopmentDepartment;
    this.ifChosenHrDepartment = chosenHrDepartment;

    this.newUser.phone = '35839946448845';
    this.newUser.email = 'trley@gmail.com';
    this.newUser.roles = ['Teamlead', 'Manager'];


    if (this.validateUser()) {
      if (this.newUser._id) {
        this.userService.updateUser(this.newUser)
          .takeUntil(this.destroy$)
          .subscribe((data: any) => {

            this.router.navigate(['/profile/my-profile/', this.newUser._id], {relativeTo: this.route});
          });
      } else {
        this.userService.addUser(this.newUser)
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
    let requiredForCreationUserFields = [this.newUser.firstName, this.newUser.lastName, this.newUser.department,
                                         this.newUser.position, this.newUser.hr, this.newUser.manager];

    if (this.ifChosenDevelopmentDepartment) {
      requiredForCreationUserFields = [...requiredForCreationUserFields, this.newUser.teamlead];
    }

    this.ifChosenHrDepartment ? this.newUser.type = 'hr' : this.newUser.type = 'developer';

    let requiredField = true;
    requiredForCreationUserFields.map(elem => {
      if (!elem) {
        requiredField = false;
      }
    });

    return requiredField;

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}


