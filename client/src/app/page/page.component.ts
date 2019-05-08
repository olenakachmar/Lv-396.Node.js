import { Component, OnInit } from '@angular/core';
import { UserService } from '../common/services/user.service';
import { User } from '../common/models/user';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  user = new User();

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser()
      .subscribe(user => this.user = user);
  }

  updateDataFilterOptions = (options: any, dateValue: any): [] => {
    if (dateValue === -1) {
      return options;
    }

    return options.map(opt =>
      opt.name === 'date' ? {name: opt.name, value: dateValue} : opt);
  };
}
