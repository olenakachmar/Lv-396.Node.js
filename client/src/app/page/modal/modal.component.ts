import { Component, OnInit, TemplateRef, Input, EventEmitter, Output } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TasksService } from '../../page/common/tasks.service';
import { UserService } from '../../app_services/user.service';
import { User } from '../../app_models/user';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Task } from '../common/task';
import { FiltersService } from '../common/filters.service';
import { FilterOptions } from '../common/filter-options';
import { Filter } from '../common/filter';

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
  filtersAll: Filter[];
  theFilter: Filter;


  constructor(private readonly modalService: BsModalService,
              private readonly tasksService: TasksService,
              private readonly fb: FormBuilder,
              private readonly filtersService: FiltersService,
              private readonly userService: UserService) {
    this.modalForm = fb.group({
      name: ['', Validators.required],
      content: ['', Validators.required],
      assignTo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userService.getAll()
      .subscribe(users => this.users = users);
    this.userService.getUser()
      .subscribe(user => this.user = user);
  }

  getFiltersNew(): any {
    this.filtersService.getFilters()
      .subscribe(filtersAll => this.theFilter = this.editFilter(filtersAll));
  }

  private readonly editFilter = (filtersAll: Filter[]): Filter => {
    const filterElem = {...filtersAll.filter(item => item.id === 1)[0]};
    filterElem.defaultValue = this.task.status.value;
    filterElem.options = filterElem.options.filter(item => item.value > -1);

    return filterElem;
  };

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
    this.getFiltersNew();
  }

  onSubmit(event: any, s: any, a: any): void {
    const newname = event.target.name;
    const newcontent = event.target.content;
    const newAssignTo = event.target.assignTo;
    this.editTask = {
      id: this.task.id,
      name: newname,
      content: newcontent,
      status: s,
      assignTo: newAssignTo,
      excerpt: this.task.excerpt,
      reassigned: this.task.author._id
    };
  }

  trackElement(index: number, element: any): any {
    return element ? element.guid : 0;
  }
}
