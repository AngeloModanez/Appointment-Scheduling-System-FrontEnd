import { Component, computed, inject, input, OnInit, output } from '@angular/core';
import { FormInput } from "@components/form-input/form-input";
import { Area } from '@models/area';
import { FormSelect } from "@components/form-select/form-select";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Professional } from '@models/professional';
import { SelectOption } from '@models/selectOptions';

@Component({
  selector: 'app-form-new-appointment',
  imports: [FormInput, FormSelect, ReactiveFormsModule],
  templateUrl: './form-new-appointment.html',
  styles: ``,
})
export class FormNewAppointment {
  private formBuilder = inject(FormBuilder);

  areas = input<Area[]>([]);
  professionals = input<Professional[]>([]);
  selectedAreaEvent = output<Area>();

  appointmentForm = this.formBuilder.group({
    area: [null, Validators.required],
    professional: [null, Validators.required],
  });

  areaOptions = computed<SelectOption[]>(() =>
    this.areas().map(a => ({ value: a.id, label: a.name }))
  );

  professionalOptions = computed<SelectOption[]>(() =>
    this.professionals().map(p => ({ value: p.id, label: p.name }))
  );

  onAreaChange(areaId: any) {
    const area = this.areas().find(a => a.id == areaId);
    if (area) {
      this.selectedAreaEvent.emit(area);
      this.aProfessional.reset();
    }
  }

  get aArea() { return this.appointmentForm.get("area") as FormControl }
  get aProfessional() { return this.appointmentForm.get("professional") as FormControl }
}
