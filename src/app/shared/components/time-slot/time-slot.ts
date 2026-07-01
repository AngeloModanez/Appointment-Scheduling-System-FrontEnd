import { Component, computed, input, output, ViewEncapsulation } from '@angular/core';
import { Time } from '@features/schedule/components/calendar/models/time';

@Component({
  selector: 'app-time-slot',
  imports: [],
  templateUrl: './time-slot.html',
  styleUrl: './time-slot.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
    '(click)': 'onClick()'
  }
})

export class TimeSlot {
  slot = input.required<Time>();
  selectedSlot = input<string>('');
  slotClicked = output<string>();

  onClick() {
    if (this.slot().available) {
      this.slotClicked.emit(this.slot().time);
    }
  }

  hostClasses = computed(() => {
    const s = this.slot();
    const classes = ['col', 'slot'];
    if (!s.available) classes.push('slot-off');
    else if (s.time === this.selectedSlot()) classes.push('slot-selected');
    else classes.push('slot-available');
    return classes.join(' ');
  });
}
