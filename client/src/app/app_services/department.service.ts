import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Department} from '../app_models/department';
import { HttpClient } from '@angular/common/http';
import { httpOptions } from '../app_services/user.service';

const api = 'http://127.0.0.1:3000/api/v1';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor( private http: HttpClient ) { }

  getAllDepartments(): Observable<Department> {
    return this.http.get<Department>(`${api}/departments/`, httpOptions);
  }
}
