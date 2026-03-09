import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-search-input',
  imports: [FormsModule],
  templateUrl: './table-search-input.html',
  styles: ``,
})
export class TableSearchInput {
  value = '';
  @Input() placeholder = 'Search';
  @Output() search = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.value);
  }
}
