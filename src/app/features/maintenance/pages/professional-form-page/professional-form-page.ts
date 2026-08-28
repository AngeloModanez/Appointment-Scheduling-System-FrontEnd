import { Component, computed, effect, inject, signal } from '@angular/core';
import { PageLayout } from "@components/page-layout/page-layout";
import { FormInput } from "@components/form-input/form-input";
import { Button } from "@components/button/button";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { internationalPhoneValidator } from 'src/app/shared/validators/phone-validator';
import { ProfessionalService } from '@services/professional-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Professional } from '@models/professional';
import { ToastService } from '@services/toast-service';
import { AreaService } from '@services/area-service';
import { Area } from '@models/area';
import { SelectOption } from '@models/select-options';

@Component({
  selector: 'app-professional-form-page',
  imports: [PageLayout, FormInput, Button, ReactiveFormsModule],
  templateUrl: './professional-form-page.html',
  styles: ``,
})
export class ProfessionalFormPage {
  private areaService = inject(AreaService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private professionalService = inject(ProfessionalService);
  private formBuilder = inject(FormBuilder);

  areas = signal<Area[]>([]);
  areaOptions = computed<SelectOption[]>(() =>
    this.areas().map(a => ({ value: a.id, label: a.name }))
  );

  professionalForm = this.formBuilder.group({
    id: [0],
    name: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, internationalPhoneValidator()]],
    active: [false],
    areasId: [[] as number[], Validators.required]
  });

  isEditing: boolean = false;
  table = '/management/professionals-table';

  constructor() {
    this.loadAreas();

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
      error: () => this.toastService.error("Error on load Professional. Try again.")
    });
  }

  loadAreas() {
    this.areaService.getAreas().subscribe({
      next: areas => this.areas.set(areas)
    });
  }

  save() {
    this.professionalForm.markAllAsTouched();
    if (this.professionalForm.valid) {
      const professional = this.professionalForm.value as Professional;
      if (this.isEditing) {
        this.professionalService.update(professional).subscribe({
          next: () => {
            this.toastService.success("Professional update successfully!");
            this.router.navigate([this.table]);
          },
          error: () => this.toastService.error("Failed to update professional. Try again."),
        })
      } else {
        this.professionalService.save(professional).subscribe({
          next: () => {
            this.toastService.success("Professional created successfully!");
            this.router.navigate([this.table]);
          },
          error: () => this.toastService.error("Failed to create professional. Try again."),
        });
      }
    }
  }

  cancel() {
    this.router.navigate([this.table]);
  }

  onAreaCheck(areaId: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const current: number[] = this.afAreasId.value ?? [];

    if (checked) {
      this.afAreasId.setValue([...current, areaId]);
    } else {
      this.afAreasId.setValue(current.filter(id => id !== areaId));
    }

    this.afAreasId.markAsTouched();
  }

  get afName() { return this.professionalForm.get("name") as FormControl }
  get afPhone() { return this.professionalForm.get("phone") as FormControl }
  get afActive() { return this.professionalForm.get("active") as FormControl }
  get afAreasId() { return this.professionalForm.get("areasId") as FormControl }
}
