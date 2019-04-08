import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Department} from '../app_models/department';
import { HttpClient } from '@angular/common/http';
import { httpOptions } from '../app_services/user.service';
import { api } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor( private http: HttpClient ) { }

  getAllDepartments(): Observable<Department> {
    return this.http.get<Department>(`${api}/departments/`, httpOptions);
  }
}
