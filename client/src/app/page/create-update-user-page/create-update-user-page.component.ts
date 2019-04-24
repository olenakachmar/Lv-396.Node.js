import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import { Contact, User } from '../../common/models/user';
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-create-update-user-page',
  templateUrl: './create-update-user-page.component.html',
  styleUrls: ['./create-update-user-page.component.scss']
})
export class CreateUpdateUserPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  newUser: User;
  ifChosenDevelopmentDepartment: boolean;
  notValidUser: boolean;

  constructor(readonly userService: UserService) {
  }

  ngOnInit() {
    this.notValidUser = false;
  }

  extractUser(user, chosenDevelopmentDepartment): any {
    this.newUser = user;
    this.ifChosenDevelopmentDepartment = chosenDevelopmentDepartment;

    this.newUser.contacts = [new Contact('a', 'b')];
    this.newUser.type = 'developer';
    this.newUser.phone = '3583996448845';
    this.newUser.email = 'm44llrley@gmail.com';
    this.newUser.roles = ['HR', 'Manager'];

    if (this.validateUser()) {
      this.userService.addUser(this.newUser)
        .takeUntil(this.destroy$)
        .subscribe((data: any) => {
          window.location.href = `/profile/my-profile/${data.newUser._id}`;
        });
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


