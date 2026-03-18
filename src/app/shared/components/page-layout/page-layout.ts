import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-page-layout',
  imports: [],
  templateUrl: './page-layout.html',
  styles: ``,
})
export class PageLayout {
  title = input<string>();
  buttonName = input<string>();

  goTo = output();

  onButtonClick() {
    this.goTo.emit();
  }
}
