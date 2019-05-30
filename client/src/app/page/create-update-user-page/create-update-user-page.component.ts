import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import { User, Contact } from '../../common/models/user';
import { Subject } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateUpdateUserService } from '../common/create-update-user.service';
import { DatesItem } from '../common/dates-item';

@Component({
  selector: 'app-create-update-user-page',
  templateUrl: './create-update-user-page.component.html',
  styleUrls: ['./create-update-user-page.component.scss']
})
export class CreateUpdateUserPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();


  user: User = new User();
  finalContacts: [];
  finalDates: DatesItem[];
  finalMContacts: [];
  ifChosenDevelopmentDepartment: boolean;
  ifChosenHrDepartment: boolean;
  notValidUser: boolean;
  create: boolean;
  requiredForCreationUserFields: any[];

  constructor(readonly userService: UserService,
              private readonly router: Router,
              private  route: ActivatedRoute,
              private createUpdateUserService: CreateUpdateUserService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.userService.chosenDatesForUser.subscribe((date) => {
      this.user.dates = date;
    });
    this.subscribeForUpdates();
    this.notValidUser = false;
    this.finalContacts = [];
    this.finalDates = [];
    this.finalMContacts = [];

    this.route.paramMap.subscribe(parameterMap => {
      const id = parameterMap.get('id');
      this.getEmployee(id);
    });
    this.deleteNotValidValuesFromUserObjectOnDepartmentChoose();
  }

  private subscribeForUpdates(): void {
    this.createUpdateUserService.userDataUpdator.subscribe((date) => {
      this[date.name] = date.value;
    });
  }

  private getEmployee(id: string): void {
    if (id) {
      this.userService.getUser(id, true)
        .subscribe(user => this.user = user);
    } else {
      this.create = true;
    }
  }

  setContacts(contacts: []): void {
    this.finalContacts = contacts;
    this.user.contacts =  this.finalContacts;
  }

  setMContacts(contacts: []): void {
    this.finalMContacts = contacts;
    this.user.phone = this.finalMContacts['phone'];
    this.user.email =  this.finalMContacts['email'];
  }

  extractUser(user, chosenDevelopmentDepartment, chosenHrDepartment): any {
    this.user = user;
    this.ifChosenDevelopmentDepartment = chosenDevelopmentDepartment;
    this.ifChosenHrDepartment = chosenHrDepartment;
    this.user.contacts =  this.finalContacts;
    this.user.dates =  this.finalDates;
    console.log('test', this.user);

    if (this.validateUser()) {
      if (this.user._id) {
        this.userService.updateUser(this.user)
          .takeUntil(this.destroy$)
          .subscribe((data: any) => {
              this.toastr.success('Profile successfully updated', 'Result', {
                positionClass: 'toast-top-full-width',
                closeButton: true
              });
              this.router.navigate(['/profile/my-profile/', this.user._id], {relativeTo: this.route});
            }, error => this.errorHandling(error)
          );
      } else {
        this.userService.addUser(this.user)
          .takeUntil(this.destroy$)
          .subscribe((data: any) => {
              this.toastr.success('Profile successfully created', 'Result', {
                positionClass: 'toast-top-full-width',
                closeButton: true
              });
              this.router.navigate(['/profile/my-profile/', data.newUser._id], {relativeTo: this.route});
            }, error => this.errorHandling(error)
          );
      }
    } else {
      this.notValidUser = true;
      this.toastr.error('Please, fill in all requiredfields', 'Result', {
        positionClass: 'toast-top-full-width',
        closeButton: true
      });
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

  errorHandling(error): void {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.toastr.error(errorMessage, 'Error Message', {
      positionClass: 'toast-top-full-width',
      closeButton: true
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.createUpdateUserService.userDataUpdator.unsubscribe();
  }
}


