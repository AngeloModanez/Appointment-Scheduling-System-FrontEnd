import { Component, effect, inject } from '@angular/core';
import { PageLayout } from "@components/page-layout/page-layout";
import { FormInput } from "@components/form-input/form-input";
import { Button } from "@components/button/button";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { internationalPhoneValidator } from 'src/app/shared/validators/phone-validator';
import { ProfessionalService } from '@services/professional-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-professional-form-page',
  imports: [PageLayout, FormInput, Button, ReactiveFormsModule],
  templateUrl: './professional-form-page.html',
  styles: ``,
})
export class ProfessionalFormPage {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private professionalService = inject(ProfessionalService);
  private formBuilder = inject(FormBuilder);

  professionalForm = this.formBuilder.group({
    id: [0],
    name: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, internationalPhoneValidator()]],
    active: [false],
  });

  isEditing: boolean = false;

  constructor() {
    effect(() => {
      this.activatedRoute.paramMap.subscribe(params => {
        let professionalId = Number(params.get("id") ?? 0);
        if (professionalId) {
          this.loadProfessional(professionalId);
          this.isEditing = true;
        }
      });
    });
  }

  loadProfessional(professionalId: number) {
    this.professionalService.getProfessionalById(professionalId).subscribe({
      next: professional => this.professionalForm.setValue(professional),
      error: () => alert("Error on load Professional")
    });
  }

  cancel() {
    this.router.navigate(['/management/professionals-table']);
  }

  get afName() { return this.professionalForm.get("name") as FormControl }
  get afPhone() { return this.professionalForm.get("phone") as FormControl }
  get afActive() { return this.professionalForm.get("active") as FormControl }
}
