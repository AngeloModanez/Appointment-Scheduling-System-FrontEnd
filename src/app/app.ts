import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Toast } from "@components/toast/toast";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Toast],
  templateUrl: './app.html',
  styles: ``,
})
export class App {
  protected readonly title = signal('Appointment-FrontEnd');
}
