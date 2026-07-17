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
  calendarDate = input<Date>(new Date());
  availableDays = input<number[]>([]);

  changedDate = output<Date>();
  changedMonth = output<Date>();

  days = signal<Day[]>([]);
  selectedDay = signal<number>(0);

  constructor() {
    effect(() => {
      this.availableDays();
      this.calendarDate();
      untracked(() => {
        this.selectedDay.set(0);
        this.loadCalendar();
      });
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
    this.changedDate.emit(new Date(this.calendarDate().getFullYear(), this.calendarDate().getMonth(), this.selectedDay()));
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
    const next = new Date(this.calendarDate());
    next.setMonth(next.getMonth() + 1);
    next.setDate(1);
    this.selectedDay.set(0);
    this.changedMonth.emit(next);
  }

  onPreviousMonth() {
    const prev = new Date(this.calendarDate());
    prev.setMonth(prev.getMonth() - 1);
    prev.setDate(1);
    this.selectedDay.set(0);
    this.changedMonth.emit(prev);
  }

  showPreviousMonth(): boolean {
    return !this.isDateCurrentMonthYear(this.calendarDate());
  }

  isDateCurrentMonthYear = (date: Date): boolean => date.getMonth() == new Date().getMonth() && date.getFullYear() == new Date().getFullYear()
}
