import { Component, computed, inject, input, OnInit, output } from '@angular/core';
import { FormInput } from "@components/form-input/form-input";
import { Area } from '@models/area';
import { FormSelect } from "@components/form-select/form-select";
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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

  selectedArea = output<Area>();
  selectedProfessional = output<Professional>();

  clientValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    if (typeof value === 'object' && value.id) return null;
    return { invalidClient: true };
  }

  appointmentForm = this.formBuilder.group({
    area: this.formBuilder.control<number | null>(null, Validators.required),
    professional: this.formBuilder.control<number | null>(
      { value: null, disabled: true },
      Validators.required
    ),
    appointmentType: this.formBuilder.control<number | null>(
      null,
      Validators.required
    ),
    client: this.formBuilder.control<Client | null>(
      null,
      [Validators.required, this.clientValidator]
    ),
    comment: this.formBuilder.control<string>('', { nonNullable: true })
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
      this.selectedArea.emit(area);
      this.afProfessional.reset();
      this.afProfessional.enable();
    }
  }

  onProfessionalChange(professionalId: any) {
    const professional = this.professionals().find(p => p.id == professionalId);
    if (professional) {
      this.selectedProfessional.emit(professional);
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
