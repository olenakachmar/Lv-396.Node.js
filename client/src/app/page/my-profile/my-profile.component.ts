import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../common/services/user.service';
import { User } from '../../common/models/user';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  modalRef: BsModalRef;
  message: string;

  constructor(private readonly userInfoService: UserService,
              private readonly route: ActivatedRoute,
              private modalService: BsModalService) { }

  user: User;
  id: any;

  ngOnInit() {
    this.checkIdParam();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.userInfoService.deleteUser(this.user._id)
      .takeUntil(this.destroy$)
      .subscribe(() => console.log(`Employee with Id = ${this.user._id} deleted`));
    window.location.href = `/profile/contact-info`;
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  private readonly checkIdParam = () => {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadUser(this.id);
  };

  private getFullName(): string {
    return `${this.user.firstName} ${this.user.lastName}`;
  }

  private readonly loadUser = (id: string) => {
    this.userInfoService.getUser(this.id)
      .subscribe(user => { this.user = user; });
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
