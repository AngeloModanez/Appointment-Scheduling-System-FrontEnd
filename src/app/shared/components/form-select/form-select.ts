import { Component, input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-form-select',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form-select.html',
  styles: ``,
})
export class FormSelect {
  title = input.required<string>();
  id = input.required<string>();
  change = input();
  control = input<FormControl>(new FormControl());
}
