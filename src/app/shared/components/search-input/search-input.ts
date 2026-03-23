import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  imports: [FormsModule],
  templateUrl: './search-input.html',
  styles: ``,
})
export class SearchInput {
  placeholder = input.required<string>();
  search = output<string>();

  timeout: any;

  onInput(value: string) {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.search.emit(value);
    }, 300);
  }
}
