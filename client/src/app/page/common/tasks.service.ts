import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Task } from './task';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../app_services/user.service';
import { api } from './consts';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { throwError } from 'rxjs';
import { httpOptions } from '../../app_services/user.service';

@Injectable({
  providedIn: 'root'
})

export class TasksService {
  statusOptions: { Status, Type };

  constructor(private http: HttpClient, private userService: UserService) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${api}/issues/all`, httpOptions);
  }

  handleError(err: Response | any) {
    return throwError(err);
  }

  update(task: any) {
    return this.http.put(`${api}/issues`, task, httpOptions);
  }
}

