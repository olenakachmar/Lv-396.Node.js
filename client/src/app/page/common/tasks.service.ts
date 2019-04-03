import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { Task } from './task';
import { Http, RequestOptions, Headers } from '@angular/http';
import { UserService, api } from '../../app_services/user.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class TasksService {

  constructor(private http: Http, private userService: UserService) {}

  getTasks(): Observable<Task[]> {
    const options = this.userService.getRequestOptions();
    return this.http.get(`${api}/issues/all`, options)
    .map(response => {
      const tasks: Task[] = response.json();
      return tasks;
    });
  }

  convertDate(date) {
    return moment(date).format('L');
  }

}
