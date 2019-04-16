import { Component, OnInit, TemplateRef, Input, EventEmitter, Output } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TasksService } from '../../page/common/tasks.service';
import { UserService } from '../../app_services/user.service';
import { User } from '../../app_models/user';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FiltersService } from '../common/filters.service';
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
  @Output() readonly filterVal = new EventEmitter();
  modalRef: BsModalRef;
  selectedStatus: {};
  users: User[];
  user: User;
  editTask: any;
  filtersAll: Filter[];
  theFilter: Filter;
  getFilter = new EventEmitter();
  obj: {
    filterId: number,
    optionId: any
  };

  constructor(private readonly modalService: BsModalService,
              private readonly tasksService: TasksService,
              private readonly fb: FormBuilder,
              private readonly filtersService: FiltersService,
              private readonly userService: UserService) {
    this.modalForm = fb.group({
      id: new FormControl(),
      name: new FormControl(),
      content: new FormControl(),
      excerpt: new FormControl(),
      status: this.fb.group({
        name: new FormControl(),
        value: new FormControl(),
      }),
      assignTo: new FormControl(),
      reassigned: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.userService.getAll()
      .subscribe(users => this.users = users);
    this.userService.getUser()
      .subscribe(user => this.user = user);
  }

  sendFilterVal = (i: number, event: any) => {
    this.obj = {
      filterId: i,
      optionId: event
    };
    this.getFilter.emit(this.obj);
    console.log(this.obj);
  };

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

  public openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
    this.getFiltersNew();
  }

  public onSubmit(event: any): void {
    const newname = event.target.name.value;
    const newcontent = event.target.content.value;
    const newexcerpt = event.target.excerpt.value;
    const newAssignTo = event.target.assignTo.value;
    this.editTask = {
      id: this.task.id,
      name: newname,
      content: newcontent,
      status: {
        name: this.task.status.name,
        value: this.task.status.value,
      },
      excerpt: newexcerpt,
      assignTo: newAssignTo,
      reassigned: this.task.author._id,
    };
    this.tasksService.editTask(this.editTask)
      .subscribe((item: any) => console.log(item));
  }

  trackElement(index: number, element: any): any {
    return element ? element.guid : 0;
  }
}
