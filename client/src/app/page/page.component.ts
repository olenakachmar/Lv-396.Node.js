import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  jsonData;

  ngOnInit() {
    this.jsonData = {
      userinfo: {
        name: 'Name',
        surname: 'Surname',
        position: 'position',
        managerName: 'Manager Has',
        managerSurname: 'Name',
        departament: 'Departament Has Name'
      }
    };
  }

  updateDataFilterOptions = (options: any, dateValue: any): [] => {
    if (dateValue === -1) {
      return options;
    }
    return options.map(opt =>
      opt.name === 'date' ? {name: opt.name, value: dateValue} : opt);
  }
}
