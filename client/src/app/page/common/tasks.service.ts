import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { Task } from './task';
import { Http, RequestOptions, Headers } from '@angular/http';
import { UserService, api } from '../../app_services/user.service';
import * as moment from 'moment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TasksService {

  constructor(private http: Http, private userService: UserService) {}

  getTasks(): Observable<Task[]> {
    const options = this.userService.getRequestOptions();
    return this.http.get(`${api}/issues/all`, options)
    .map(response => {
      const getTask = response.json();
      const tasks: Task[] = getTask.map( (item: any) => {
        return {
          id: item._id,
          name: item.title,
          excerpt: '',
          status: {name: item.priority, value: this.getStatusValue(item.priority)},
          type: {name: item.type, value: this.getTaskType(item.type)},
          date: this.convertDate(item.created),
          author: '',
          content: item.value
        };
      });

      return tasks;
    });
  }

  getStatusValue = (status: string): number => {
    if (status.toLowerCase() === 'high') {
      return 0;
    }
    if (status.toLowerCase() === 'normal') {
      return 1;
    }
    return 2;
  }

  getTaskType = (type: string): number => {
    if (status === 'issue') {
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
}
