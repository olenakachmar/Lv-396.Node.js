import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task';
import { HttpClient } from '@angular/common/http';
import { httpOptions } from '../../common/services/user.service';
import { api } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TasksService {
  constructor(private readonly http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${api}/issues/all`, httpOptions);
  }

  update(task: any): any {
    return this.http.put(`${api}/issues`, task, httpOptions);
  }
}

