import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../common/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../../../common/services/department.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() users: User[];
  @Input() filterText: string;
  departments: any;
  user: User;
  id: any;

  constructor(private readonly router: Router, private readonly route: ActivatedRoute, private readonly departmentService: DepartmentService) {}

  ngOnInit() {
    this.checkIdParam();
    this.loadDepartments();
  }

  selectUser(uid: number) {
    this.router.navigate(['/profile/my-profile/', uid], {relativeTo: this.route});
  }

  checkIdParam(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  loadDepartments() {
    this.departmentService.getAllDepartments().subscribe(department => this.departments = department);
  }

}
