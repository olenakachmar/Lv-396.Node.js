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
  userType: string;

  constructor(readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.userType = this.userService.getUserType();
  }

  extractUser(user): any {
    this.newUser = user;
    this.newUser.contacts = [new Contact('a', 'b')];
    this.newUser.type = 'developer';
    this.newUser.phone = '33336448845';
    this.newUser.email = 'marley@gmail.com';

    const requiredForCreationUserFields = [this.newUser.firstName, this.newUser.lastName, this.newUser.department,
                                       this.newUser.position, this.newUser.teamlead, this.newUser.hr, this.newUser.manager];

    requiredForCreationUserFields.map(elem => {
      if (elem === undefined) {
      } else {
        this.userService.addUser(this.newUser)
          .takeUntil(this.destroy$)
          .subscribe((data: any) => {
            window.location.href = `/profile/my-profile/${data.newUser._id}`;
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

