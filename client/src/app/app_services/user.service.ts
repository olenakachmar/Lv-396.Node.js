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

  constructor(private http: HttpClient) { }

  helper = new JwtHelperService();


  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${api}users`, httpOptions)
  }

  getUser(id?: string): Observable<User> {
    const userId = this.getUserId();
    return this.http.get<User>(`${api}users/${id || userId}`, httpOptions)
  }

  getUserId(): any {
    const helper = new JwtHelperService();
    return helper.decodeToken(localStorage.token).id;
  }

  getUserType(): any {
    return this.helper.decodeToken(localStorage.token).type;
  }

}
