import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Task } from './task';
import { HttpClient } from '@angular/common/http';
import { UserService, httpOptions } from '../../app_services/user.service';
import { api } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})

export class TasksService {
  statusOptions: { Status: {}, Type: {} };

  constructor(private readonly http: HttpClient, private readonly userService: UserService) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${api}/issues/all`, httpOptions);
  }

  handleError(err: Response | any): any {
    return throwError(err);
  }

  // update(task: any): any {
  //   return this.http.put(`${api}/issues`, task, httpOptions);
  // }



  updateResolvedBy(userId: string, taskId: number): any {
    const body = {
      userId,
      id: taskId,
    };

    return this.http.put<Task>(`${api}/issues/resolve`, body, httpOptions);
  }
}

