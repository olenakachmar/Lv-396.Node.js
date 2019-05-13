import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, TaskCreateRequestBody, TaskEditRequestBody } from './task';
import { HttpClient } from '@angular/common/http';
import { httpOptions } from '../../common/services/user.service';
import { api } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})

export class TasksService {
  constructor(private readonly http: HttpClient) { }
  tasks: Task[];

  public isOpenTask: BehaviorSubject<string> = new BehaviorSubject('');

  public taskIsWatched(id: string, issueID: string): Observable<Task> {
    const body = {
      issueID,
      id
    };

    return this.http.put<Task>(`${api}/users/watched_issues`, body, httpOptions);
  }

  public getUserTasks(id: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${api}issues?userId=${id}`, httpOptions);
  }

  public updateResolvedBy(userId: string, taskId: string): Observable<any> {
    const body = {
      userId,
      id: taskId,
    };

    return this.http.put<Task>(`${api}/issues/resolve`, body, httpOptions);
  }

  public createComment(id: string, content: string, creator: string): Observable<any> {
    const body = {
      id,
      content,
      creator
    };

    return this.http.put<Task>(`${api}/issues/comment`, body);
  }

  public editTask(requestBody: TaskEditRequestBody): Observable<any> {
    return this.http.put<TaskEditRequestBody>(`${api}/issues`, requestBody, httpOptions);
  }

  public createTask(requestBody: TaskCreateRequestBody): Observable<any> {
    return this.http.post<TaskCreateRequestBody>(`${api}issues`, requestBody, httpOptions);
  }

  public deleteTask(taskId: string): Observable<{}> {
    return this.http.delete(`${api}issues/${taskId}`, httpOptions);
  }

}
