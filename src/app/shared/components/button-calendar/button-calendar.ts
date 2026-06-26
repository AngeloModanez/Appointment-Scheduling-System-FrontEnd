import { Component, computed, input, output, ViewEncapsulation } from '@angular/core';
import { Day } from '@features/schedule/components/calendar/models/day';

@Component({
  selector: 'app-button-calendar',
  imports: [],
  templateUrl: './button-calendar.html',
  styleUrl: './button-calendar.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
    '(click)': 'onClick()'
  }
})
export class ButtonCalendar {
  day = input.required<Day>();
  selectedDay = input<number>(0);
  dayClicked = output<number>();

  onClick() {
    if (this.day().available) {
      this.dayClicked.emit(this.day().day);
    }
  }

  hostClasses = computed(() => {
    const d = this.day();
    const classes = ['col', 'day'];
    if (!d.day) classes.push('day-off-month');
    else if (!d.available) classes.push('day-off');
    else if (d.day === this.selectedDay()) classes.push('day-selected');
    else classes.push('day-available');
    return classes.join(' ');
  });
}
