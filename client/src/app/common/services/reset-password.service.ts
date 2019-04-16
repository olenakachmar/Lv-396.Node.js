import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { throwError } from 'rxjs';
import { api } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private readonly http: HttpClient) { }

  sendPassword(newPass: string, token: string) {
    return this.http.post(`${api}auth/recover_password`, {
      newPass,
      token
    })
      .catch(this.handleError);
  }

  handleError(err: Response | any) {
    return throwError(err);
  }
}
