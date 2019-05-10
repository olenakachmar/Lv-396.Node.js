import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, TaskCreateRequestBody, TaskEditRequestBody } from './task';
import { HttpClient } from '@angular/common/http';
import { httpOptions } from '../../common/services/user.service';
import { api } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TasksService {
  constructor(private readonly http: HttpClient) { }
  tasks: Task[];

  public isOpenTask: BehaviorSubject<string> = new BehaviorSubject('');
  public allUserTasks: BehaviorSubject<Task[]> = new BehaviorSubject([]);

  public taskIsWatched(id: string, issueID: string): Observable<Task> {
    const body = {
      issueID,
      id
    };

    return this.http.put<Task>(`${api}/users/watched_issues`, body, httpOptions);
  }

  public getUserTasks(id: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${api}issues/${id}`, httpOptions)
      .pipe(tap(res => {
        res.map((item: any) =>
          ({
            id: item._id,
            name: item.name,
            excerpt: item.excerpt,
            status: { name: item.status.name, value: item.status.value },
            type: { name: item.type.name, value: item.type.value },
            date: item.date,
            author: item.author,
            content: item.content,
            assignTo: item.assignTo,
            reassigned: item.reassigned,
            resolvedByAuthor: item.resolvedByAuthor,
            resolvedByPerformer: item.resolvedByPerformer,
            isOpen: false
          }))
          .sort((a, b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));
      }),
        tap(res => {
          this.allUserTasks.next(res);
        }));
  }

  public updateResolvedBy(userId: string, taskId: string): Observable<any> {
    const body = {
      userId,
      id: taskId,
    };

    return this.http.put<Task>(`${api}/issues/resolve`, body, httpOptions);
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
