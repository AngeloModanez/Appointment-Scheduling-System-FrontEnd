import { Component, inject } from '@angular/core';
import { PageLayout } from "@components/page-layout/page-layout";
import { FormInput } from "@components/form-input/form-input";
import { Button } from "@components/button/button";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '@services/client-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-form-page',
  imports: [PageLayout, FormInput, Button, ReactiveFormsModule],
  templateUrl: './client-form-page.html',
  styles: ``,
})
export class ClientFormPage {

  private router = inject(Router);

  clientForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private clientService: ClientService) {
    this.clientForm = formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    })
  }

  save() {
    this.clientForm.markAllAsTouched();
    if (this.clientForm.valid) {
      this.clientService.save(this.clientForm.value).subscribe({
        next: () => this.router.navigate(['/management/clients-table']),
        error: () => alert("Erro")
      });
    }
  }

  cancel() {
    this.router.navigate(['/management/clients-table']); // 👈
  }

  get cfName() { return this.clientForm.get("name") as FormControl }
  get cfPhone() { return this.clientForm.get("phone") as FormControl }
  get cfDateOfBirth() { return this.clientForm.get("dateOfBirth") as FormControl }
}
