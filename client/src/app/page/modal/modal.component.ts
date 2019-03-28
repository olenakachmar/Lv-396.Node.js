import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() item: any;
  modalRef: BsModalRef;
  @Input() show: boolean;


  constructor(private modalService: BsModalService) {}

  ngOnInit() {
    if (this.show == true) {
      this.openModal('#template');
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    console.log(this.item);
  }

}
