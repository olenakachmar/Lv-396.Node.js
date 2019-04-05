import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { Task } from './task';
import { Http, RequestOptions, Headers } from '@angular/http';
import { UserService } from '../../app_services/user.service';
import { api } from './consts';
import moment from 'moment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { throwError } from 'rxjs';
import { Status, Type } from './statusOptions.enum';

@Injectable({
  providedIn: 'root'
})

export class TasksService {
  statusOptions: { Status, Type };

  constructor(private http: Http, private userService: UserService) {}

  getTasks(): Observable<Task[]> {
    const options = this.userService.getRequestOptions();
    return this.http.get(`${api}/issues/all`, options)
      .map(response => {
        const getTask = response.json();
        const tasks: Task[] = getTask.map( (item: any) => {
          return {
            id: item._id,
            name: item.name,
            excerpt: '',
            status: {name: item.status, value: this.getStatusValue(item.status)},
            type: {name: item.type, value: this.getTaskType(item.type)},
            date: this.convertDate(item.date),
            author: '',
            content: item.content
          };
        });
        return tasks;
      });
  }

  getStatusValue = (status: string): number => {
    if (status === Status.high) {
      return 0;
    }
    if (status === Status.normal) {
      return 1;
    }
    return 2;
  }

  getTaskType = (type: string): number => {
    if (type === Type.issue) {
      return 1;
    }
    return 0;
  }

  convertDate(date: number): string {
    return moment(date).format('L');
  }

  handleError(err: Response | any) {
    return throwError(err);
  }

  update(task: any) {
    const options = this.userService.getRequestOptions();
    return this.http.put(`${api}/issues`, task, options);
  }
}

