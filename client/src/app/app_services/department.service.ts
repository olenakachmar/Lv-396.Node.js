import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {Department} from "../app_models/department";
import {RequestOptions, Headers, Http} from "@angular/http";

const api = 'http://127.0.0.1:3000/api/v1';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {


  constructor( private http: Http ) { }

  getAllDepartments(): Observable<Department>{
    const options = this.getRequestOptions();
    return this.http.get(`${api}/departments`, options)
      .map(response => {
        console.log(response);
        const departments: Department = response.json();
        console.log(departments);
        return departments;
      });
  }

  // getAllDepartments(): string{return this.http.get("http://127.0.0.1:3000/api/v1/departments");}
  // getDepartmentById(id: number): Observable<Department> {
  //   const options = this.getRequestOptions();
  //   return this.http.get("http://127.0.0.1:3000/api/v1/departments/" + id)
  //     .map(response => {
  //       const department: Department = response.json();
  //       return department;
  //     });
  // }
  //
  // getMockData(){
  //   return [{id:1}, {id:2}]
  // }
  //
  getRequestOptions() {
    const headers = new Headers({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return new RequestOptions({ headers });
  }
}
