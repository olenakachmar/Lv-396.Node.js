import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Task } from '../common/task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../common/tasks.service';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.scss']
})
export class CommentModalComponent implements OnInit {
  @Input() task: Task;
  modalRef: BsModalRef;
  form: FormGroup;

  constructor(private readonly modalService: BsModalService, private readonly tasksService: TasksService) { }

  public openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
  }

  createComment(form: any): boolean {
    console.log(form);
    this.tasksService
      .createComment(this.task.id, form.comment)
      .subscribe(
        (response: any) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );

    return false;
  }

}
