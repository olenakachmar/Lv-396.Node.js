import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../app_models/user';


const link = 'http://127.0.0.1:3000/api/v1';
const id = '5c9a062d8c40cb0e8cd39d0a';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private http: Http) { }

  getUser(): Observable<User> {
    const options = this.getRequestOptions();
    return this.http.get(`${link}/users/${id}`, options)
      .map(response => {
        const user = response.json();
        return user;
      });
  }


  getRequestOptions() {
    const headers = new Headers({
      Authorization: `Bearer ${localStorage.getItem('username')}`
    });
    return new RequestOptions({ headers });
  }
}
