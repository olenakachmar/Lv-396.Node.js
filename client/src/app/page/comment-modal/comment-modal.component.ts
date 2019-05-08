import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Task } from '../common/task';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.scss']
})
export class CommentModalComponent implements OnInit {
  @Input() task: Task;
  modalRef: BsModalRef;

  constructor(private readonly modalService: BsModalService) { }

  public openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
  }

}
