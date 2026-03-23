import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-button',
  imports: [RouterLink],
  templateUrl: './button.html',
  styles: ``,
})
export class Button {
  buttonName = input<string>('Button');
  routerLink = input<string>('');
  btnClass = input<string>('btn btn-primary');
}
