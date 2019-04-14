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

  public updateResolvedBy(userId: string, taskId: number): any {
    const body = {
      userId,
      id: taskId,
    };

    return this.http.put<Task>(`${api}/issues/resolve`, body, httpOptions);
  }

  public editTask(id: string, name: string, excerpt: string, status: any,
                  content: string, assignTo: any, reassigned: any): any {
    const body = {
      id,
      name,
      excerpt,
      status,
      content,
      assignTo,
      reassigned,
    };

    return this.http.put<Task>(`${api}/issues`, body, httpOptions);
  }
}

