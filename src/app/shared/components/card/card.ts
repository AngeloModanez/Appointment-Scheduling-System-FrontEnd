import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styles: ``,
})
export class Card {
  title = input<string>('No results found');
  message = input<string>('');
}
