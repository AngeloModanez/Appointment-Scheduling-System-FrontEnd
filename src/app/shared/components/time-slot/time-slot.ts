import { Component, computed, input, output, ViewEncapsulation } from '@angular/core';
import { TimeModel } from '@features/schedule/components/time/models/time-model';
import { TimePipe } from "../../pipes/time-pipe";

@Component({
  selector: 'app-time-slot',
  imports: [TimePipe],
  templateUrl: './time-slot.html',
  styleUrl: './time-slot.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
    '(click)': 'onClick()'
  }
})

export class TimeSlot {
  slot = input.required<TimeModel>();
  selectedSlot = input<TimeModel>();
  slotClicked = output<TimeModel>();

  onClick() {
    if (this.slot().available) {
      this.slotClicked.emit(this.slot());
    }
  }

  hostClasses = computed(() => {
    const s = this.slot();
    const classes = ['col', 'slot'];
    if (!s.available) classes.push('slot-off');
    else if (s.startTime === this.selectedSlot()?.startTime) classes.push('slot-selected');
    else classes.push('slot-available');
    return classes.join(' ');
  });
}
