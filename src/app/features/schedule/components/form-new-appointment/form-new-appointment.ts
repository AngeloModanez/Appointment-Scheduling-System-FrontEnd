import { Component, computed, inject, input, OnInit, output } from '@angular/core';
import { FormInput } from "@components/form-input/form-input";
import { Area } from '@models/area';
import { FormSelect } from "@components/form-select/form-select";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Professional } from '@models/professional';
import { SelectOption } from '@models/select-options';
import { AppointmentType } from '@models/appointment-type';
import { OperatorFunction } from 'rxjs';
import { Client } from '@models/client';

@Component({
  selector: 'app-form-new-appointment',
  imports: [FormInput, FormSelect, ReactiveFormsModule],
  templateUrl: './form-new-appointment.html',
  styles: ``,
})
export class FormNewAppointment {
  private formBuilder = inject(FormBuilder);

  areas = input<Area[]>([]);
  appointmentTypes = input<AppointmentType[]>([]);
  professionals = input<Professional[]>([]);
  searchClients = input<OperatorFunction<string, readonly Client[]>>();

  selectedAreaEvent = output<Area>();

  appointmentForm = this.formBuilder.group({
    area: [null, Validators.required],
    professional: [{ value: null, disabled: true }, Validators.required],
    appointmentType: [null, Validators.required],
    client: [null, Validators.required],
    comment: ['']
  });

  areaOptions = computed<SelectOption[]>(() =>
    this.areas().map(a => ({ value: a.id, label: a.name }))
  );

  professionalOptions = computed<SelectOption[]>(() =>
    this.professionals().map(p => ({ value: p.id, label: p.name }))
  );

  appointmentTypeOptions = computed<SelectOption[]>(() =>
    this.appointmentTypes().map(at => ({ value: at.id, label: at.type }))
  );

  onAreaChange(areaId: any) {
    const area = this.areas().find(a => a.id == areaId);
    if (area) {
      this.selectedAreaEvent.emit(area);
      this.afProfessional.reset();
      this.afProfessional.enable();
    }
  }

  formatClient = (client: Client) => client.name;

  get selectedClient(): Client | null {
    return this.appointmentForm.controls["client"].value;
  }

  get afArea() { return this.appointmentForm.get("area") as FormControl }
  get afProfessional() { return this.appointmentForm.get("professional") as FormControl }
  get afAppointmentType() { return this.appointmentForm.get("appointmentType") as FormControl }
  get afClient() { return this.appointmentForm.get("client") as FormControl }
}
