import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentType } from '@models/appointment-type';
import { AppointmentTypeService } from '@services/appointment-type-service';
import { ToastService } from '@services/toast-service';
import { PageLayout } from "@components/page-layout/page-layout";
import { FormInput } from "@components/form-input/form-input";
import { Button } from '@components/button/button';

@Component({
  selector: 'app-appointment-type-form-page',
  imports: [PageLayout, FormInput, Button, ReactiveFormsModule],
  templateUrl: './appointment-type-form-page.html',
  styles: ``,
})
export class AppointmentTypeFormPage {
  private router = inject(Router);
  private appointmentTypeService = inject(AppointmentTypeService);
  private formBuilder = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  private toastService = inject(ToastService);

  appointmentTypeForm = this.formBuilder.group({
    id: [0],
    type: ['', [Validators.required, Validators.minLength(3)]]
  });

  isEditing: boolean = false;

  constructor() {
    effect(() => {
      this.activatedRoute.paramMap.subscribe(params => {
        let appointmentTypeId = Number(params.get("id") ?? 0);
        if (appointmentTypeId) {
          this.loadArea(appointmentTypeId);
          this.isEditing = true;
        }
      });
    });
  }

  loadArea(appointmentTypeId: number) {
    this.appointmentTypeService.getAppointmentTypeById(appointmentTypeId).subscribe({
      next: appointmentType => this.appointmentTypeForm.setValue(appointmentType),
      error: () => alert("Error on load appointment type")
    })
  }

  save() {
    this.appointmentTypeForm.markAllAsTouched();
    if (this.appointmentTypeForm.valid) {
      const appointmentType = this.appointmentTypeForm.value as AppointmentType;
      if (this.isEditing) {
        this.appointmentTypeService.update(appointmentType).subscribe({
          next: () => {
            this.toastService.success("Appointment type update successfully!");
            this.router.navigate(['/management/appointment-types-table']);
          },
          error: () => this.toastService.error("Failed to update appointment type. Try again."),
        });
      } else {
        this.appointmentTypeService.save(appointmentType).subscribe({
          next: () => {
            this.toastService.success("Appointment type created successfully!");
            this.router.navigate(['/management/appointment-types-table']);
          },
          error: () => this.toastService.error("Failed to create appointment type. Try again."),
        });
      }
      console.log(appointmentType)
    }
  }

  cancel() {
    this.router.navigate(['/management/appointment-types-table']);
  }

  get afType() { return this.appointmentTypeForm.get("type") as FormControl }
}
