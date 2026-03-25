import { Component, effect, inject } from '@angular/core';
import { PageLayout } from "@components/page-layout/page-layout";
import { FormInput } from "@components/form-input/form-input";
import { Button } from "@components/button/button";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '@services/client-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '@models/client';
import { ToastService } from '@services/toast-service';

@Component({
  selector: 'app-client-form-page',
  imports: [PageLayout, FormInput, Button, ReactiveFormsModule],
  templateUrl: './client-form-page.html',
  styles: ``,
})
export class ClientFormPage {

  private router = inject(Router);
  private clientService = inject(ClientService);
  private formBuilder = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  private toastService = inject(ToastService);

  clientForm = this.formBuilder.group({
    id: [0],
    name: ['', Validators.required],
    phone: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
  });

  isEditing: boolean = false;

  constructor() {
    effect(() => {
      this.activatedRoute.paramMap.subscribe(params => {
        let clientId = Number(params.get("id") ?? 0);
        if (clientId) {
          this.loadClient(clientId);
          this.isEditing = true;
        }
      });
    });
  }

  loadClient(clientId: number) {
    this.clientService.getClientById(clientId).subscribe({
      next: client => this.clientForm.setValue(client),
      error: () => alert("Error on load Client")
    })
  }

  save() {
    this.clientForm.markAllAsTouched();
    if (this.clientForm.valid) {
      const client = this.clientForm.value as Client;
      if (this.isEditing) {
        this.clientService.update(client).subscribe({
          next: () => {
            this.toastService.success("Client update successfully!");
            this.router.navigate(['/management/clients-table']);
          },
          error: () => this.toastService.error("Failed to update client. Try again."),
        });
      } else {
        this.clientService.save(client).subscribe({
          next: () => {
            this.toastService.success("Client created successfully!");
            this.router.navigate(['/management/clients-table']);
          },
          error: () => this.toastService.error("Failed to create client. Try again."),
        });
      }
    }
  }

  cancel() {
    this.router.navigate(['/management/clients-table']);
  }

  get cfName() { return this.clientForm.get("name") as FormControl }
  get cfPhone() { return this.clientForm.get("phone") as FormControl }
  get cfDateOfBirth() { return this.clientForm.get("dateOfBirth") as FormControl }
}
