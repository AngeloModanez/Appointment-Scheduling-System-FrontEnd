import { Component, effect, inject } from '@angular/core';
import { PageLayout } from "@components/page-layout/page-layout";
import { FormInput } from "@components/form-input/form-input";
import { Button } from "@components/button/button";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '@services/toast-service';
import { AreaService } from '@services/area-service';
import { Area } from '@models/area';

@Component({
  selector: 'app-area-form-page',
  imports: [PageLayout, FormInput, Button, ReactiveFormsModule],
  templateUrl: './area-form-page.html',
  styles: ``,
})
export class AreaFormPage {

  private router = inject(Router);
  private areaService = inject(AreaService);
  private formBuilder = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  private toastService = inject(ToastService);

  areaForm = this.formBuilder.group({
    id: [0],
    name: ['', Validators.required, Validators.minLength(3)]
  });

  isEditing: boolean = false;

  constructor() {
    effect(() => {
      this.activatedRoute.paramMap.subscribe(params => {
        let areaId = Number(params.get("id") ?? 0);
        if (areaId) {
          this.loadArea(areaId);
          this.isEditing = true;
        }
      });
    });
  }

  loadArea(areaId: number) {
    this.areaService.getAreaById(areaId).subscribe({
      next: area => this.areaForm.setValue(area),
      error: () => alert("Error on load Area")
    })
  }

  save() {
    this.areaForm.markAllAsTouched();
    if (this.areaForm.valid) {
      const area = this.areaForm.value as Area;
      if (this.isEditing) {
        this.areaService.update(area).subscribe({
          next: () => {
            this.toastService.success("Area update successfully!");
            this.router.navigate(['/management/areas-table']);
          },
          error: () => this.toastService.error("Failed to update area. Try again."),
        });
      } else {
        this.areaService.save(area).subscribe({
          next: () => {
            this.toastService.success("Area created successfully!");
            this.router.navigate(['/management/areas-table']);
          },
          error: () => this.toastService.error("Failed to create area. Try again."),
        });
      }
      console.log(area)
    }
  }

  cancel() {
    this.router.navigate(['/management/areas-table']);
  }

  get afName() { return this.areaForm.get("name") as FormControl }
}

