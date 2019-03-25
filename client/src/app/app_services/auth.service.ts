import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
	constructor( private http: Http ) { }

	login(username: string, password: string) {
		return this.http
      .post('https://reqres.in/api/login', {
        username,
        password
      })
    .map(response => response.json());
	}

	logout(): any {
		localStorage.removeItem('username');
	}

	getUser(): any {
 		return localStorage.getItem('username');
 	}

 	isLoggedIn(): boolean {
 		return this.getUser() !== null;
	}
	 

}

export const AUTH_PROVIDERS: Array<any> = [
 	{ provide: AuthService, useClass: AuthService }
];