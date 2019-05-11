import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { OptionPair } from '../../../common/models/option-pair';

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
      contacts: this.fb.group({
      })
    });
    this.datesForm = date.group({
      dates: this.date.group({
      })
    });
  }

  ngOnInit(): void {
    this.contacts = [];
    this.dates = [];
    this.pairList = [{_id: 1, name: 'telegram'}, {_id: 2, name: 'skype'}];
  }

  addContact(): void {
    const item = `contact-${this.contacts.length}`;
    this.getContacts.addControl(item, new FormControl('', [Validators.required]));
    this.contacts = [...this.contacts, item];
  }

  removeContact(control: string): void {
    this.getContacts.removeControl(control) ;
    this.contacts.pop();
  }

  get getContacts() {
    return this.profileForm.get('contacts') as FormGroup;
  }

  addDate(): void {
    const item = `date-${this.dates.length}`;
    this.getDate.addControl(item, new FormControl('', [Validators.required]));
    this.dates = [...this.dates, item];
  }

  removeDate(control: string): void {
    this.getDate.removeControl(control) ;
    this.dates.pop();
  }

  get getDate(): any {
    return this.datesForm.get('dates') as FormGroup;
  }
}
