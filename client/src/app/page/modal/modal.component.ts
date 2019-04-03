import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TasksService } from '../../page/common/tasks.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private modalService: BsModalService, private tasksService: TasksService, private fb: FormBuilder) {
    this.modalForm = fb.group({
      name: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit() {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmit() {}
}
