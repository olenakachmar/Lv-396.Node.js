import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../app_models/user';

const token = localStorage.getItem('token');
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
      const users : User[] = response.json();
      return users;
    })
  }
  
  getRequestOptions() {
    const headers = new Headers({
      Authorization: `Bearer ${token}`
    });
    return new RequestOptions({ headers });
  }
}
