import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../common/services/user.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-user-image',
  templateUrl: './user-image.component.html',
  styleUrls: ['./user-image.component.scss']
})
export class UserImageComponent implements OnInit {
  form: FormGroup;
  @ViewChild('fileInput') inputEl: ElementRef;
  @Output() onUpload: EventEmitter<string>;
  @Input() imageURL: string;
  
  constructor(private fb: FormBuilder, private userService: UserService, private cd: ChangeDetectorRef) {
    this.form = fb.group({
      avatar: null
    });
  }

  ngOnInit() {
    this.onUpload = new EventEmitter<string>();
    this.imageURL = this.imageURL || 'assets/img/userimg.jpg';
  }

  upload(form: any) {
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    this.userService.postImage(inputEl.files[0])
      .subscribe((data: {url: string})=> {
        this.onUpload.emit(data.url);
      })
  }

}
