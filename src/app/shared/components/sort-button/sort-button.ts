import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-sort-button',
  imports: [],
  templateUrl: './sort-button.html',
  styles: ``,
})
export class SortButton {
  active = input.required<boolean>();
  clicked = output();
}
