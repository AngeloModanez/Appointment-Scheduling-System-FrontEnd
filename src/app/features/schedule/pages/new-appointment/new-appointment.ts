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
import { ProfessionalService } from '@services/professional-service';
import { Time } from "@features/schedule/components/time/time";
import { TimeModel } from '@features/schedule/components/time/models/time-model';
import { Appointment } from '@models/appointment';
import { AppointmentModal } from "@features/schedule/components/appointment-modal/appointment-modal";

@Component({
  selector: 'app-new-appointment',
  imports: [PageLayout, FormNewAppointment, Button, Calendar, Time, AppointmentModal],
  templateUrl: './new-appointment.html',
  styles: ``,
})
export class NewAppointment {
  areaService = inject(AreaService);
  appointmentTypeService = inject(AppointmentTypeService);
  clientService = inject(ClientService);
  professionalService = inject(ProfessionalService);

  @ViewChild(FormNewAppointment)
  formNewAppointment?: FormNewAppointment;

  @ViewChild(AppointmentModal)
  appointmentModal?: AppointmentModal;

  areas = signal<Area[]>([]);
  appointmentTypes = signal<AppointmentType[]>([]);
  professionalsByArea = signal<Professional[]>([]);

  availableDays = signal<number[]>([]);
  calendarDate = signal<Date>(new Date());
  appointmentDate = signal<Date | null>(null);

  availableTimes = signal<TimeModel[]>([]);
  appointmentTime = signal<TimeModel | null>(null);

  selectedProfessional: Professional = {} as Professional;

  calendarError = signal('');
  timeError = signal('');

  currentAppointment = signal<Appointment>({
    client: {} as Client,
    area: {} as Area,
    professional: {} as Professional,
    appointmentType: {} as AppointmentType,
    date: new Date(),
    startTime: '',
    endTime: '',
    comments: '',
    id: 0
  });

  constructor() {
    this.loadAreas();
    this.loadAppointmentTypes();
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
    this.professionalService.getAvailableDays(this.selectedProfessional, this.calendarDate()).subscribe({
      next: days => this.availableDays.set(days)
    });
  }

  loadAvailableTimes() {
    const date = this.appointmentDate();
    if (!date || !this.selectedProfessional?.id) return;
    this.professionalService.getAvailableTimes(this.selectedProfessional, date).subscribe({
      next: times => this.availableTimes.set(times)
    });
  }

  onSelectedProfessional(professional: Professional) {
    this.selectedProfessional = professional;
    this.calendarDate.set(new Date());
    this.loadAvailableDays();
    this.availableTimes.set([]);
    this.appointmentDate.set(null);
  }

  onSelectedTime(time: TimeModel) {
    this.timeError.set('');
    this.appointmentTime.set(time);
  }

  onChangedMonth(date: Date) {
    this.calendarDate.set(date);
    this.availableTimes.set([]);
    this.appointmentDate.set(null);
    this.appointmentTime.set(null);
    this.loadAvailableDays();
  }

  onSelectedDate(date: Date) {
    this.calendarError.set('');
    this.appointmentDate.set(date);
    this.appointmentTime.set(null);
    this.availableTimes.set([]);
    this.loadAvailableTimes();
  }

  onSelectedArea(area: Area) {
    this.availableDays.set([]);
    this.availableTimes.set([]);
    this.areaService.getActiveProfessionalsFromArea(area).subscribe({
      next: professionals => {
        this.professionalsByArea.set(professionals);
      }
    });
  }

  private checkDateAndTimeErrors(): void {
    if (!this.appointmentDate()) this.calendarError.set("Please select an available date");
    if (!this.appointmentTime()) this.timeError.set("Please select an available time slot");
  }

  private isAppointmentValid(): boolean {
    return !!(this.formNewAppointment?.appointmentForm.valid && this.calendarDate() && this.appointmentTime())
  }


  private createAppointmentObject(): Appointment {
    const form = this.formNewAppointment!.appointmentForm.value;
    return {
      ...form,
      area: this.areas().find(a => a.id == form.area),
      professional: this.selectedProfessional,
      appointmentType: this.appointmentTypes().find(at => at.id == form.appointmentType),
      date: this.appointmentDate()!,
      startTime: this.appointmentTime()!.startTime,
      endTime: this.appointmentTime()!.endTime,
    } as Appointment;
  }

  resetForm() {
    this.formNewAppointment?.appointmentForm.reset();
    this.formNewAppointment?.afProfessional.disable();
    this.selectedProfessional = {} as Professional;
    this.professionalsByArea.set([]);
    this.availableDays.set([]);
    this.availableTimes.set([]);
    this.appointmentDate.set(null);
    this.appointmentTime.set(null);
    this.calendarDate.set(new Date());
  }

  createAppointment() {
    this.formNewAppointment?.appointmentForm.markAllAsTouched();
    this.checkDateAndTimeErrors();

    if (this.isAppointmentValid()) {
      this.currentAppointment.set(this.createAppointmentObject());
      this.appointmentModal?.open().then(confirm => {
        if (confirm) {
          this.resetForm();
        }
      }).catch(() => { });
    }
  }
}
