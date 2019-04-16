import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../app_models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { api } from '../../environments/environment';

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

  constructor(private readonly http: HttpClient) {
  }

  helper = new JwtHelperService();

  getAll(): Observable<User[]> {
    httpOptions.headers = this.getHeader();

    return this.http.get<User[]>(`${api}users`, httpOptions);
  }

  getAllTeamLeads(): Observable<User[]> {
    return this.http.get<User[]>(`${api}users?position=TEAM_LEAD`, httpOptions);
  }

  getUser(id?: string): Observable<User> {
    httpOptions.headers = this.getHeader();
    const userId = this.getUserId();

    return this.http.get<User>(`${api}users/${id || userId}`, httpOptions);
  }

  getUserId(): any {
    httpOptions.headers = this.getHeader();
    const helper = new JwtHelperService();

    return helper.decodeToken(localStorage.token).id;
  }

  getUserType(): any {
    return this.helper.decodeToken(localStorage.token).type;
  }

  private readonly getHeader = () =>
    httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${api}auth/signup`, user, httpOptions);
  }

}
