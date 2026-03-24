import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-layout',
  imports: [],
  templateUrl: './page-layout.html',
  styles: ``,
})
export class PageLayout {
  title = input.required<string>();
}
