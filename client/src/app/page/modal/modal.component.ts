import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() item: any;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    console.log(this.item);
  }
  submit(form: NgForm) {
    // let editItem = this.item;
    // this.item.date = form.value.date.toString();
    // console.log(form.value);

  }
}
