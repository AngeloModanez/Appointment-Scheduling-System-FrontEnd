import { Component, inject, signal, ViewChild } from '@angular/core';
import { PageLayout } from "@components/page-layout/page-layout";
import { FormNewAppointment } from "@features/schedule/components/form-new-appointment/form-new-appointment";
import { Button } from "@components/button/button";
import { AreaService } from '@services/area-service';
import { Area } from '@models/area';
import { Professional } from '@models/professional';
import { AppointmentTypeService } from '@services/appointment-type-service';
import { AppointmentType } from '@models/appointment-type';
import { ClientService } from '@services/client-service';
import { debounceTime, distinctUntilChanged, filter, Observable, switchMap } from 'rxjs';
import { Client } from '@models/client';
import { Calendar } from "@features/schedule/components/calendar/calendar";

@Component({
  selector: 'app-new-appointment',
  imports: [PageLayout, FormNewAppointment, Button, Calendar],
  templateUrl: './new-appointment.html',
  styles: ``,
})
export class NewAppointment {
  areaService = inject(AreaService);
  appointmentTypeService = inject(AppointmentTypeService);
  clientService = inject(ClientService);

  @ViewChild(FormNewAppointment)
  formNewAppointment?: FormNewAppointment;

  areas = signal<Area[]>([]);
  appointmentTypes = signal<AppointmentType[]>([]);
  professionalsByArea = signal<Professional[]>([]);
  availableDays = signal<number[]>([]);
  calendarDate = signal<Date>(new Date());
  appointmentDate = signal<Date | null>(null);

  constructor() {
    this.loadAreas();
    this.loadAppointmentTypes();
    this.loadAvailableDays();
  }

  searchClients = (text: Observable<string>): Observable<Client[]> => {
    return text.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter(term => term.length >= 2),
      switchMap(term => this.clientService.getClientsWithNameContaining(term))
    )
  }

  loadAreas() {
    this.areaService.getAreas().subscribe({
      next: areas => this.areas.set(areas),
    });
  }

  loadAppointmentTypes() {
    this.appointmentTypeService.getAppointmentTypes().subscribe({
      next: types => this.appointmentTypes.set(types),
    })
  }

  loadAvailableDays() {
    this.availableDays.set([]);
  }

  onSelectedProfessional(professional: Professional) {
    alert(professional);
  }

  onSelectedDate(date: Date) {
    this.appointmentDate.set(date);
  }

  onSelectedArea(area: Area) {
    this.areaService.getActiveProfessionalsFromArea(area).subscribe({
      next: professionals => {
        this.professionalsByArea.set(professionals);
      }
    });
  }

  createAppointment() {
    if (this.formNewAppointment) {
      this.formNewAppointment.appointmentForm.markAllAsTouched();
      if (this.formNewAppointment.appointmentForm.valid && this.appointmentDate()) {
        console.log({
          ...this.formNewAppointment.appointmentForm.value,
          date: this.appointmentDate()
        });
      }
    }
  }
}
