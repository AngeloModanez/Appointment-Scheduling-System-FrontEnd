import { Component, signal } from '@angular/core';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-calendar',
  imports: [DatePipe, TitleCasePipe],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar {
  calendarDate = signal<Date>(new Date());
}
