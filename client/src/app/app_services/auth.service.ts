import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { throwError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private http: Http) { }

  auth(login: string, password: string) {
    return this.http.post('http://127.0.0.1:3000/api/v1/auth/login', {
      login,
      password
    }).map(response => {console.log(response); return response.json(); })
      .catch(this.handleError);
  }

  logout(): any {
    localStorage.removeItem('token');
  }

  getUser(): any {
    return localStorage.getItem('type');
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  handleError(err: Response | any) {
    return throwError(err);
  }
}


export const AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService }
];
