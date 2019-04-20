import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../common/services/user.service';
import { User } from '../../common/models/user';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  modalRef: BsModalRef;
  message: string;

  constructor(private readonly UserInfoService: UserService, private readonly route: ActivatedRoute,
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
    this.UserInfoService.deleteUser(this.user._id)
      .subscribe( () => console.log(`Employee with Id = ${this.user._id} deleted`)),
      (err) => console.log(err);
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
    this.UserInfoService.getUser(this.id).subscribe(user => { this.user = user; });
  };
}
