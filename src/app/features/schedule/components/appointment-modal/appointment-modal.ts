import { Component, input, ViewChild } from '@angular/core';
import { Modal } from '@components/modal/modal';
import { Appointment } from '@models/appointment';
import { Button } from "@components/button/button";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointment-modal',
  imports: [Button, DatePipe, Modal],
  templateUrl: './appointment-modal.html',
  styles: ``,
})
export class AppointmentModal {
  @ViewChild(Modal)
  modal!: Modal;

  appointment = input.required<Appointment>();

  open() {
    return this.modal.open();
  }
}
