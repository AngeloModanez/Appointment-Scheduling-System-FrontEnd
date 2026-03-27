import { Component, inject, input, output } from '@angular/core';
import { FormInput } from "@components/form-input/form-input";
import { Area } from '@models/area';
import { FormSelect } from "@components/form-select/form-select";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-new-appointment',
  imports: [FormInput, FormSelect, ReactiveFormsModule],
  templateUrl: './form-new-appointment.html',
  styles: ``,
})
export class FormNewAppointment {
  private formBuilder = inject(FormBuilder);

  areas = input<Area[]>([]);

  selectedAreaEvent = output<Area>();

  appointmentForm = this.formBuilder.group({
    area: [null, Validators.required],
  });

  onAreaChange() {
    const areaId = Number(this.appointmentForm.value["area"]);
    const area = this.areas().find(a => a.id == areaId);
    if (area) this.selectedAreaEvent.emit(area);
  }

  get aArea() { return this.appointmentForm.get("area") as FormControl }
}
