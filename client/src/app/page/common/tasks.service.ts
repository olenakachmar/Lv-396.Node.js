import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task';
import { HttpClient } from '@angular/common/http';
import { httpOptions } from '../../app_services/user.service';
import { api } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TasksService {
  constructor(private readonly http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${api}/issues/all`, httpOptions);
  }

  handleError(err: Response | any): any {
    return throwError(err);
  }

  updateResolvedBy(userId: string, taskId: number): any {
    const body = {
      userId,
      id: taskId,
    };

    return this.http.put<Task>(`${api}/issues/resolve`, body, httpOptions);
  }
}

