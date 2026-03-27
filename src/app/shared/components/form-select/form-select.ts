import { Component, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { SelectOption } from '@models/select-options';

@Component({
  selector: 'app-form-select',
  imports: [ReactiveFormsModule],
  templateUrl: './form-select.html',
})
export class FormSelect {
  title = input.required<string>();
  id = input.required<string>();
  placeholder = input<string>('Select an option');
  control = input<FormControl>(new FormControl());
  options = input<SelectOption[]>([]);
  changed = output<any>();
}
