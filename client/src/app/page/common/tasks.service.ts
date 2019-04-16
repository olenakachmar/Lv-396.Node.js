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
  tasks: Task[];

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

  public editTask(obj: any): any {
    const body = {
      id: obj.id,
      name: obj.name,
      excerpt: obj.excerpt,
      statusName: obj.status.name,
      statusValue: obj.status.value,
      content: obj.content,
      assignTo: obj.assignTo,
      reassigned: obj.reassigned,
    };

    return this.http.put<Task>(`${api}/issues`, body, httpOptions);
  }
}

