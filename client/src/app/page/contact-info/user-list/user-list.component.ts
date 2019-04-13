import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../app_models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../../../app_services/department.service';
import { UserService } from '../../../app_services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() users: User[];
  @Input() filterText: string;
  departments: any;
  id: any;

  constructor(private readonly router: Router, private readonly route: ActivatedRoute,
   private readonly departmentService: DepartmentService, private readonly userService: UserService) {}

  ngOnInit() {
    this.loadAllUsers();
  }

  selectUser(uid: any) {
    this.router.navigate(['/profile/my-profile/', uid], {relativeTo: this.route});
  }

  loadAllUsers(): void {
    if(this.getDepartmentId()) {
      this.getAllEmployees();
    } 
    if(!this.getDepartmentId())
      this.getAllUsers(); 
  }

  getDepartmentId(): string {
    return this.id = this.route.snapshot.paramMap.get('id');
  }

  getAllEmployees(): any {
    this.departmentService.getAllDepartments().subscribe((department: any) => {
      department.filter(item => item.name === this.id).map(item => this.users = item.employees);
    });
  }

  getAllUsers(): any {
    this.userService.getAll().subscribe(users => this.users = users );
  }

}