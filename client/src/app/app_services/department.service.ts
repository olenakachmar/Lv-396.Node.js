import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IDepartment } from '../app_models/department';
import { HttpClient } from '@angular/common/http';
import { httpOptions } from './user.service';
import { api } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private readonly http: HttpClient) { }

  getAllDepartments(): Observable<IDepartment[]> {
    return this.http.get<IDepartment[]>(`${api}/departments/`, httpOptions);
  }
}
