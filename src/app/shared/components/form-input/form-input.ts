import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  imports: [ReactiveFormsModule],
  templateUrl: './form-input.html',
  styles: ``,
})
export class FormInput {
  type = input.required<string>();
  title = input.required<string>();
  id = input.required<string>();
  placeholder = input<string>('');
  control = input<FormControl>(new FormControl());
}
