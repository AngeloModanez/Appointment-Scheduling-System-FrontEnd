import { Component, effect, inject, signal } from '@angular/core';
import { PageLayout } from "@components/page-layout/page-layout";
import { FormNewAppointment } from "@features/schedule/components/form-new-appointment/form-new-appointment";
import { Button } from "@components/button/button";
import { AreaService } from '@services/area-service';
import { Area } from '@models/area';

@Component({
  selector: 'app-new-appointment',
  imports: [PageLayout, FormNewAppointment, Button],
  templateUrl: './new-appointment.html',
  styles: ``,
})
export class NewAppointment {
  areaService = inject(AreaService);

  areas = signal<Area[]>([]);

  constructor() {
    this.loadAreas();
  }

  loadAreas() {
    this.areaService.getAreas().subscribe({
      next: areas => this.areas.set(areas),
    });
  }

  onSelectedArea(area: Area) {
    alert(area.id + " " + area.name);
  }
}
