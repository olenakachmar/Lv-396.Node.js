import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { OptionPair } from '../../../common/models/option-pair';
import { DatesItem } from '../../common/dates-item';

@Component({
  selector: 'app-create-update-user',
  templateUrl: './create-update-user.component.html',
  styleUrls: ['./create-update-user.component.scss']
})
export class CreateUpdateUserComponent implements OnInit {
  profileForm: FormGroup;
  datesForm: FormGroup;
  pairList: OptionPair[];
  contacts: string[];
  dates: string[];


  constructor(private readonly fb: FormBuilder,
              private readonly date: FormBuilder) {
    this.profileForm = fb.group({
      email: ['', Validators.required],
      phone: ['', Validators.required],
      skype: ['', Validators.required],
      telegram: ['', Validators.required],
      date: ['', Validators.required],
      contacts: this.fb.group({
      })
    });
    this.datesForm = date.group({
      date: ['', Validators.required],
      dates: this.date.group({
      })
    });
  }

  ngOnInit() {
    this.contacts = [];
    this.dates = [];
    this.pairList = [{_id: 1, name: 'telegram'}, {_id: 2, name: 'skype'}];
  }

  addContact() {
    const item = `contact-${this.contacts.length}`;
    this.getContacts.addControl(item, new FormControl('', [Validators.required]));
    this.contacts = [...this.contacts, item];
    console.log(this.contacts);
  }

  removeContact(control: string) {
    this.getContacts.removeControl(control) ;
    this.contacts.pop();
  }

  get getContacts() {
    return this.profileForm.get('contacts') as FormGroup;
  }

  addDate() {
    const item = `date-${this.dates.length}`;
    this.getDate.addControl(item, new FormControl('', [Validators.required]));
    this.dates = [...this.dates, item];
    console.log(this.dates);
  }

  removeDate(control: string) {
    this.getDate.removeControl(control) ;
    this.dates.pop();
  }

  get getDate() {
    return this.datesForm.get('dates') as FormGroup;
  }
}
