import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { OperatorFunction } from 'rxjs';

@Component({
  selector: 'app-form-input',
  imports: [ReactiveFormsModule, NgbTypeahead],
  templateUrl: './form-input.html',
})
export class FormInput {
  type = input.required<string>();
  title = input.required<string>();
  id = input.required<string>();
  placeholder = input<string>('');
  control = input<FormControl>(new FormControl());
  typeahead = input<OperatorFunction<string, readonly any[]>>(); // 👈 opcional
  resultFormatter = input<(item: any) => string>(); // 👈 como exibir o resultado
  inputFormatter = input<(item: any) => string>();  // 👈 como exibir no input
}
