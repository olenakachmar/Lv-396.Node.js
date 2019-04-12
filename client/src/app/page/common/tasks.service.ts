import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task';
import { HttpClient } from '@angular/common/http';
import { httpOptions } from '../../app_services/user.service';
import { api } from '../../../environments/environment';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})

export class TasksService {
  // statusOptions: { Status: {}, Type: {} };

  constructor(private readonly http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${api}/issues/all`, httpOptions);
  }

  // handleError(err: Response | any): any {
  //   return throwError(err);
  // }

  update(task: any): any {
    return this.http.put(`${api}/issues`, task, httpOptions);
  }
}

