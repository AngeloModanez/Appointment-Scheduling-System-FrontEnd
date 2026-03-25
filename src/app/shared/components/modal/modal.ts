import { Component, inject, input, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styles: ``,
})
export class Modal {
  modalService = inject(NgbModal);

  @ViewChild("modal")
  private modalContent!: TemplateRef<Modal>;

  title = input<string>();

  open() {
    return this.modalService.open(this.modalContent, {}).result
  }

  close(result: boolean) {
    this.modalService.dismissAll(result);
  }
}
