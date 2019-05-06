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
          this.user = user;
        });
    } else {
      this.create = true;
    }
  }

  extractUser(user, chosenDevelopmentDepartment, chosenHrDepartment): any {
    console.log(user);
    this.user = user;
    this.ifChosenDevelopmentDepartment = chosenDevelopmentDepartment;
    this.ifChosenHrDepartment = chosenHrDepartment;

    this.user.phone = '35839946448845';
    this.user.email = 'trley@gmail.com';
    this.user.roles = ['Teamlead', 'Manager'];


    if (this.validateUser()) {
      if (this.user._id) {
        console.log(this.user._id);
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
    let requiredForCreationUserFields = [this.user.firstName, this.user.lastName, this.user.department,
                                         this.user.position, this.user.hr, this.user.manager];

    if (this.ifChosenDevelopmentDepartment) {
      requiredForCreationUserFields = [...requiredForCreationUserFields, this.user.teamlead];
    }

    this.ifChosenHrDepartment ? this.user.type = 'hr' : this.user.type = 'developer';

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


