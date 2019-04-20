import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../common/services/user.service';

@Component({
  selector: 'app-user-image',
  templateUrl: './user-image.component.html',
  styleUrls: ['./user-image.component.scss']
})
export class UserImageComponent implements OnInit {
  form: FormGroup;
  @ViewChild('fileInput') inputEl: ElementRef;
  
  constructor(private fb: FormBuilder, private userService: UserService, private cd: ChangeDetectorRef) {
    this.form = fb.group({
      avatar: null
    });
  }

  ngOnInit() {
  }

  upload(form: any) {
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    this.userService.getImage(inputEl.files[0])
      .subscribe(user => console.log(user))
  }

}
