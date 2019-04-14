import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-create-user-page',
  templateUrl: './create-user-page.component.html',
  styleUrls: ['./create-user-page.component.scss']
})
export class CreateUserPageComponent implements OnInit {
  userObject: object;

  constructor() {
  }

  ngOnInit() {
  }

  retrieveSelectedObject(event): void {
    this.userObject = event;
  }
}

