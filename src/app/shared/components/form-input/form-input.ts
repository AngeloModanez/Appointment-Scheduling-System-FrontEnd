import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-input',
  imports: [],
  templateUrl: './form-input.html',
  styles: ``,
})
export class FormInput {
  type = input.required<string>();
  title = input.required<string>();
  id = input.required<string>();
  placeholder = input<string>('');

}
