import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { throwError } from 'rxjs';
import { api } from '../../environments/environment';



@Injectable()
export class AuthService {
  constructor(private readonly http: HttpClient) { }

  auth(login: string, password: string) {
    return this.http.post(`${api}auth/login`, {
      login,
      password
    })
      .catch(this.handleError);
  }

  logout(): any {
    localStorage.clear();
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
