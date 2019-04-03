import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TasksService } from '../../page/common/tasks.service';
import { UserService } from '../../app_services/user.service';
import { User } from '../../app_models/user';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Task } from '../common/task';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  public modalForm: FormGroup;
  @Input() tasks: any;
  modalRef: BsModalRef;
  selectedStatus: {};
  users: User[];
  user: User;
  editTask: {};
  constructor(private modalService: BsModalService, private tasksService: TasksService,
              private fb: FormBuilder, private userService: UserService) {
    this.modalForm = fb.group({
      name: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  statuses = [
    {name: 'High', value: 0},
    {name: 'Normal', value: 1},
    {name: 'Low', value: 2}
  ];

  ngOnInit() {
    this.userService.getAll().subscribe(users => this.users = users);
    this.userService.getUser().subscribe(user => this.user = user);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  onSubmit(event: any, s: any, a: any) {
    const newname = event.target.name.value;
    const newcontent = event.target.content.value;
    this.editTask = {
      id: a,
      name: newname,
      content: newcontent,
      status: s,
      assignTo: `${this.user.firstName} ${this.user.lastName}`,
      excerpt: this.tasks.excerpt,
      date: this.tasks.date,
      author: this.tasks.author
    };
    this.tasksService.update(this.editTask);
  }
}
