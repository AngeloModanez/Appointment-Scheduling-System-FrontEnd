import { Component, inject, input, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styles: ``,
})
export class Modal {
  private modalService = inject(NgbModal);
  private modalRef!: NgbModalRef;

  @ViewChild("modal")
  private modalContent!: TemplateRef<Modal>;

  title = input<string>();
  size = input<'sm' | 'lg' | 'xl'>('lg');

  open() {
    this.modalRef = this.modalService.open(this.modalContent, { size: this.size() });
    return this.modalRef.result;
  }

  close(result: boolean) {
    this.modalRef.close(result);
  }
}
