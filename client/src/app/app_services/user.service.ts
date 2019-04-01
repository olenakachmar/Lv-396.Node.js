import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../app_models/user';
import { IUser } from '../app_interfaces/user.interface';

const api = 'http://127.0.0.1:3000/api/v1';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http) { }

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
    return this.http.get(`${api}/users/5c9a06728c40cb0e8cd39d14`, options)
      .map(response => {
        const user: User = response.json();
        return user;
      });
  }

  getRequestOptions() {
    const headers = new Headers({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return new RequestOptions({ headers });
  }
}
