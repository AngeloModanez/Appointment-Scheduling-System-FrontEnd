import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-layout',
  imports: [],
  templateUrl: './page-layout.html',
  styles: ``,
})
export class PageLayout {
  @Input() title = 'Title';
  @Input() btn = 'Button';

  @Output() goTo = new EventEmitter<void>();

  onButtonClick() {
    this.goTo.emit();
  }
}
