import { Component, effect, input, output, signal, untracked } from '@angular/core';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { Day } from './models/day';
import { ButtonCalendar } from "@components/button-calendar/button-calendar";

@Component({
  selector: 'app-calendar',
  imports: [DatePipe, TitleCasePipe, ButtonCalendar],
  templateUrl: './calendar.html',
  styles: ``,
})
export class Calendar {
  calendarDate = signal<Date>(new Date());
  days = signal<Day[]>([]);
  selectedDay = signal<number>(0);
  availableDays = input<number[]>([]);
  selectedDate = output<Date>();

  constructor() {
    effect(() => {
      this.availableDays();
      this.calendarDate();
      untracked(() => this.loadCalendar());
    });
  }

  loadCalendar() {
    this.days.set([
      ... this.getInitialBlankDays(this.calendarDate().getFullYear(), this.calendarDate().getMonth()),
      ... this.getDaysInMonth(this.calendarDate().getFullYear(), this.calendarDate().getMonth())
    ]);

    this.days.set([
      ... this.days(),
      ... this.getFinalBlankDays(this.days().length)
    ]);
  }

  onSelectedDay(day: number) {
    this.selectedDay.set(day);
    const date = new Date(this.calendarDate());
    date.setDate(day);
    this.selectedDate.emit(date);
  }

  getDaysInMonth(year: number, month: number): Day[] {
    let numberOfDays: number = this.getNumberOfDays(year, month);
    let days: Day[] = []

    for (let i = 1; i <= numberOfDays; i++) {
      if (this.availableDays().includes(i)) {
        days.push({ day: i, available: true });
      } else {
        days.push({ day: i, available: false });
      }
    }

    return days;
  }

  getInitialBlankDays(year: number, month: number): Day[] {
    let firstDay = this.getFirstDayInMonth(year, month);
    let emptyDays = firstDay.getDay();
    let days: Day[] = []

    for (let i = 0; i < emptyDays; i++) {
      days.push({} as Day);
    }

    return days;
  }

  getFinalBlankDays(length: number): Day[] {
    let rest = 7 - length % 7;
    let days: Day[] = [];

    for (let i = 0; i < rest; i++) {
      days.push({} as Day);
    }

    if (days.length + length == 35) {
      for (let i = 0; i < 7; i++) {
        days.push({} as Day);
      }
    }

    return days;
  }

  getNumberOfDays(year: number, month: number): any {
    return new Date(year, month + 1, 0).getDate();
  }

  getFirstDayInMonth(year: number, month: number): Date {
    return new Date(year, month, 1);
  }

  onNextMonth() {
    this.calendarDate.set(new Date(this.calendarDate()))
    this.calendarDate().setMonth(this.calendarDate().getMonth() + 1);
    this.calendarDate().setDate(1);
    this.loadCalendar();
    this.selectedDay.set(0);
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
    this.selectedDay.set(0);
  }

  showPreviousMonth(): boolean {
    return !this.isDateCurrentMonthYear(this.calendarDate());
  }

  isDateCurrentMonthYear = (date: Date): boolean => date.getMonth() == new Date().getMonth() && date.getFullYear() == new Date().getFullYear()
}
