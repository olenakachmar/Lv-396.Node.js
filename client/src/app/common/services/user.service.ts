import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { api } from '../../../environments/environment';
import { UpdateUser } from '../models/update-user';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  chosenDepartment = new EventEmitter();

  constructor(private readonly http: HttpClient) {}

  user: User;
  helper = new JwtHelperService();

  public takeUser: BehaviorSubject<User> = new BehaviorSubject({});

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${api}users`, httpOptions);
  }

  getAllTeamLeads(): Observable<any> {
    return this.http.get<any>(`${api}users?roles=teamlead`, httpOptions);
  }

  getUsersOfHr(): Observable<User[]> {
    const userId = this.getUserId();

    return this.http.get<User[]>(`${api}users?hr=${userId}`, httpOptions);
  }

  getAllHr(): Observable<any> {
    return this.http.get<any>(`${api}users?roles=HR`, httpOptions);
  }

  getAllManagers(): Observable<any> {
    return this.http.get<any>(`${api}users?roles=Manager`, httpOptions);
  }

  getUser(id?: string): Observable<User> {
    const userId = this.getUserId();

    return this.http.get<any>(`${api}users/${id || userId}`, httpOptions)
      .pipe(tap(res => {
        this.user = {
            contacts: res.contacts,
            dates: res.dates,
            department: { _id: res.department._id, name: res.department.name, position: res.department.position },
            email: res.email,
            firstName: res.firstName,
            hr: res.hr,
            lastName: res.lastName,
            manager: {
              contacts: res.manager.contacts,
              date: res.manager.dates,
              department: res.manager.department,
              email: res.manager.email,
              firstName: res.manager.firstName,
              lastName: res.manager.lastName,
              hrID: res.manager.hr,
              manager: res.manager.manager,
              phone: res.manager.phone,
              position: res.manager.position
            },
            phone: res.phone,
            photoID: res.photoID,
            photoURL: res.photoURL,
            position: res.position,
            roles: res.roles,
            teamlead: {
              contacts: res.teamlead.contacts,
              dates: res.teamlead.dates,
              department: res.teamlead.department,
              email: res.teamlead.email,
              firstName: res.teamlead.firstName,
              lastName: res.teamlead.lastName,
              hr: res.teamlead.hr,
              manager: res.teamlead.manager,
              phone: res.teamlead.phone,
              position: res.teamlead.position,
              roles: res.teamlead.roles,
              teamlead: res.teamlead.teamlead,
              watchedIssues: res.teamlead.watchedIssues
            },
            watchedIssues: res.watched_issues,
            id: res._id,
            type: res.type
          };
        this.takeUser.next(this.user);
        })
      );
  }

  getUserId(): any {
    if (localStorage.token) {
      return this.helper.decodeToken(localStorage.token).id;
    }
  }

  getUserType(): any {
    if (localStorage.token) {
      return this.helper.decodeToken(localStorage.token).type;
    }
  }

  addUser(user: User): Observable<any> {
    return this.http.post<User>(`${api}auth/signup`, user, httpOptions);
  }

  deleteUser(id: string): Observable<any> {
    const deleteOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
      body: { id }
    };

    return this.http.delete(`${api}users/`, deleteOptions);
  }

  updateUser(user: User): Observable<any> {
    const updateUser = new UpdateUser();
    updateUser.mapUser(user);

    return this.http.put<User>(`${api}users`, updateUser, httpOptions);
  }

  getHeader(): any {
    return httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  }

  postImage(avatar: File): Observable<Object> {
    const id = this.getUserId();
    const fd = new FormData();
    fd.append('id', id);
    fd.append('avatar', avatar);

    return this.http.post(`${api}users/change_avatar`, fd);
  }

}
