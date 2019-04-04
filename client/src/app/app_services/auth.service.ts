import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { throwError } from 'rxjs';
import { api } from '../../environments/environment';



@Injectable()
export class AuthService {
  constructor(private http: Http) { }

  auth(login: string, password: string) {
    return this.http.post(`${api}auth/login`, {
      login,
      password
    }).map(response => response.json())
      .catch(this.handleError);
  }

  logout(): any {
    localStorage.removeItem('token');
    localStorage.removeItem('type');
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
