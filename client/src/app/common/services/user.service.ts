import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { api } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

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

  constructor(private readonly http: HttpClient) { }

  helper = new JwtHelperService();

  getAll(): Observable<User[]> {
    httpOptions.headers = this.getHeader();

    return this.http.get<User[]>(`${api}users`, httpOptions);
  }

  getAllTeamLeads(): Observable<any> {
    return this.http.get<any>(`${api}users1?roles=Teamlead`, httpOptions)
                    .catch(this.handleError);
  }

  handleError(error: HttpErrorResponse): any {

    return Observable.throw(error.message || 'Server Error');
    // if (error.error instanceof ErrorEvent) {
    //   console.log('Client Side Error: ', error.error.message);
    // } else {
    //   console.log(
    //     `Backend returned code ${error.status}, ` +
    //     `body was: ${error.error}`);
    // }
    //
    // return throwError(
    //   'There is a problem, with the service. We are notified & working on it.');
  }

  getAllHr(): Observable<any> {
    return this.http.get<any>(`${api}users?roles=HR`, httpOptions);
  }

  getAllManagers(): Observable<any> {
    return this.http.get<any>(`${api}users?roles=Manager`, httpOptions);
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

  addUser(user: User): Observable<any> {
    return this.http.post<User>(`${api}auth/signup`, user, httpOptions);
  }

  deleteUser(id: string): Observable<any> {
    // httpOptions.headers = this.getHeader();
    // const options ={}
    const deleteOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
      body: {id}
    };

    return this.http.delete(`${api}users/`, deleteOptions);

  }

  readonly getHeader = () =>
    httpOptions.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);

}
