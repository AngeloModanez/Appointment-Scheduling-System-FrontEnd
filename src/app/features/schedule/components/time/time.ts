import { Component, computed, input, output, signal, SimpleChanges } from '@angular/core';
import { TimeModel } from './models/time-model';
import { TimeSlot } from "@components/time-slot/time-slot";

@Component({
  selector: 'app-time',
  imports: [TimeSlot],
  templateUrl: './time.html',
  styles: ``,
})
export class Time {
  defaultTimes: TimeModel[] = [
    { startTime: "08:00:00", endTime: "08:30:00", available: false },
    { startTime: "08:30:00", endTime: "09:00:00", available: false },
    { startTime: "09:00:00", endTime: "09:30:00", available: false },
    { startTime: "09:30:00", endTime: "10:00:00", available: false },
    { startTime: "10:00:00", endTime: "10:30:00", available: false },
    { startTime: "10:30:00", endTime: "11:00:00", available: false },
    { startTime: "11:00:00", endTime: "11:30:00", available: false },
    { startTime: "11:30:00", endTime: "12:00:00", available: false },
    { startTime: "14:00:00", endTime: "14:30:00", available: false },
    { startTime: "14:30:00", endTime: "15:00:00", available: false },
    { startTime: "15:00:00", endTime: "15:30:00", available: false },
    { startTime: "15:30:00", endTime: "16:00:00", available: false },
    { startTime: "16:00:00", endTime: "16:30:00", available: false },
    { startTime: "16:30:00", endTime: "17:00:00", available: false },
    { startTime: "17:00:00", endTime: "17:30:00", available: false },
    { startTime: "17:30:00", endTime: "18:00:00", available: false }
  ];

  availableTimes = input<TimeModel[]>([]);
  selectedTimeEvent = output<TimeModel>();
  selectedTime = signal<TimeModel | null>(null);
  times = signal<TimeModel[]>([]);
  error = input<string>("");

  constructor() {
    this.times.set(this.defaultTimes);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['availableTimes']) {
      this.selectedTime.set(null);
      this.times.set(
        this.defaultTimes.map(t => ({
          ...t,
          available: this.availableTimes().some(at => at.startTime === t.startTime && at.available)
        }))
      );
    }
  }

  onSelectedTime(time: TimeModel) {
    this.selectedTime.set(time);
    this.selectedTimeEvent.emit(time);
  }
}
