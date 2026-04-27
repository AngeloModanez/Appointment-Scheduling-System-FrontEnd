import { Component, signal } from '@angular/core';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { Day } from './models/day';

@Component({
  selector: 'app-calendar',
  imports: [DatePipe, TitleCasePipe],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar {
  calendarDate = signal<Date>(new Date());
  days = signal<Day[]>([]);

  constructor() {
    this.loadCalendar();
  }

  loadCalendar() {
    this.days.set([... this.getDaysInMonth(this.calendarDate().getFullYear(), this.calendarDate().getMonth())]);
  }

  getDaysInMonth(year: number, month: number): Day[] {
    let numberOfDays: number = this.getNumberOfDays(year, month);
    let days: Day[] = []

    for (let i = 1; i <= numberOfDays; i++) {
      days.push({ day: i, available: true });
    }

    return days;
  }

  getNumberOfDays(year: number, month: number): any {
    return new Date(year, month + 1, 0).getDate();
  }

  onNextMonth() {
    this.calendarDate.set(new Date(this.calendarDate()))
    this.calendarDate().setMonth(this.calendarDate().getMonth() + 1);
    this.calendarDate().setDate(1);
    this.loadCalendar();
  }

  onPreviousMonth() {
    let previousDate = new Date(this.calendarDate())
    previousDate.setMonth(this.calendarDate().getMonth() - 1);
    previousDate.setDate(1);

    if (previousDate >= new Date()) {
      this.calendarDate.set(previousDate);
    } else {
      if (this.isDateCurrentMonthYear(previousDate)) {
        previousDate.setDate(new Date().getDate());
        this.calendarDate.set(previousDate);
      }
    }

    this.loadCalendar();
  }

  showPreviousMonth(): boolean {
    return !this.isDateCurrentMonthYear(this.calendarDate());
  }

  isDateCurrentMonthYear = (date: Date): boolean => date.getMonth() == new Date().getMonth() && date.getFullYear() == new Date().getFullYear()
}
