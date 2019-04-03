import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../app_models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

export const api = 'http://127.0.0.1:3000/api/v1';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http) { }

  helper = new JwtHelperService();


  getAll(): Observable<User[]> {
    const options = this.getRequestOptions();
    return this.http.get(`${api}/users`, options)
    .map(response => {
      const users: User[] = response.json();
      return users;
    });
  }

  getUser(): Observable<User> {
    const options = this.getRequestOptions();
    const userId = this.getUserId();

    return this.http.get(`${api}/users/${userId}`, options)
      .map(response => {
        const user: User = response.json();
        return user;
      });
  }

  getUserId(): any {
    const helper = new JwtHelperService();
    return helper.decodeToken(localStorage.token).id;
  }

  getUserType(): any {
    return this.helper.decodeToken(localStorage.token).type;
  }

  getRequestOptions() {
    const headers = new Headers({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return new RequestOptions({ headers });
  }

}
