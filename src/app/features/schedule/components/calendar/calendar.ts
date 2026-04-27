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

  onNextMonth() {
    this.calendarDate.set(new Date(this.calendarDate()))
    this.calendarDate().setMonth(this.calendarDate().getMonth() + 1);
    this.calendarDate().setDate(1);
  }

  onPreviousMonth() {
    let previousDate = new Date(this.calendarDate())
    previousDate.setMonth(this.calendarDate().getMonth() - 1);
    previousDate.setDate(1);

    if (previousDate >= new Date()) {
      return this.calendarDate.set(previousDate);
    }

    if (this.isDateCurrentMonthYear(previousDate)) {
      previousDate.setDate(new Date().getDate());
      this.calendarDate.set(previousDate);
    }
  }

  showPreviousMonth(): boolean {
    return !this.isDateCurrentMonthYear(this.calendarDate());
  }

  isDateCurrentMonthYear = (date: Date): boolean => date.getMonth() == new Date().getMonth() && date.getFullYear() == new Date().getFullYear()
}
