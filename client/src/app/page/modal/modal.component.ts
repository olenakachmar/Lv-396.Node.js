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
  modalForm: FormGroup;
  @Input() task: any;

  @Input() item: any;
  @Input() modalType: string;
  modalRef: BsModalRef;
  selectedStatus: {};
  users: User[];
  user: User;
  editTask: {};
  text = {
    reassign: 'RE-ASSIGN',
    create: 'CREATE TASK',
    reassignFrom: 'RE-ASSIGN FROM',
    from: 'FROM',
    addTask: 'ADD TASK',
  };
  constructor(private readonly modalService: BsModalService, private readonly tasksService: TasksService,
              private readonly fb: FormBuilder, private readonly userService: UserService) {
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

  ngOnInit(): void {
    this.userService.getAll()
    .subscribe(users => this.users = users);
    this.userService.getUser()
    .subscribe(user => this.user = user);
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }
  onSubmit(event: any, s: any, a: any): void {
    const newname = event.target.name.value;
    const newcontent = event.target.content.value;
    this.editTask = {
      id: a,
      name: newname,
      content: newcontent,
      status: s,
      assignTo: `${this.user.firstName} ${this.user.lastName}`,
      excerpt: this.task.excerpt,
      date: this.task.date,
      author: this.task.author
    };
    this.tasksService.update(this.editTask);
  }

  trackElement(index: number, element: any): any {
    return element ? element.guid : 0;
  }
}
