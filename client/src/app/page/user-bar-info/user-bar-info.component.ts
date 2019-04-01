import {Component, OnInit, Input} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-bar-info',
  templateUrl: './user-bar-info.component.html',
  styleUrls: ['./user-bar-info.component.scss']
})
export class UserBarInfoComponent implements OnInit {
  @Input() userinfo: {};

  constructor() {
  }

  // get(){
  //   this.http.get("/users/1");
  // }

  // private http: HttpClient
  ngOnInit() {
  }
}
