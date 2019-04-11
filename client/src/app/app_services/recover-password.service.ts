import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { throwError } from 'rxjs';
import { api } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecoverPasswordService {

  constructor(private readonly http: HttpClient) { }

  forgotPassword(email: string) {
    return this.http.post(`${api}auth/forgot_password`, {
      email
    })
      .catch(this.handleError);
  }

  handleError(err: Response | any) {
    return throwError(err);
  }
}