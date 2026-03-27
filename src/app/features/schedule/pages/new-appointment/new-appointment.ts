import { Component, effect, inject, signal } from '@angular/core';
import { PageLayout } from "@components/page-layout/page-layout";
import { FormNewAppointment } from "@features/schedule/components/form-new-appointment/form-new-appointment";
import { Button } from "@components/button/button";
import { AreaService } from '@services/area-service';
import { Area } from '@models/area';
import { Professional } from '@models/professional';
import { AppointmentTypeService } from '@services/appointment-type-service';
import { AppointmentType } from '@models/appointment-type';

@Component({
  selector: 'app-new-appointment',
  imports: [PageLayout, FormNewAppointment, Button],
  templateUrl: './new-appointment.html',
  styles: ``,
})
export class NewAppointment {
  areaService = inject(AreaService);
  appointmentTypeService = inject(AppointmentTypeService);

  areas = signal<Area[]>([]);
  appointmentTypes = signal<AppointmentType[]>([]);
  professionalsByArea = signal<Professional[]>([]);

  constructor() {
    this.loadAreas();
    this.loadAppointmentTypes();
  }

  loadAreas() {
    this.areaService.getAreas().subscribe({
      next: areas => this.areas.set(areas),
    });
  }

  loadAppointmentTypes() {
    this.appointmentTypeService.getAppointmentTypes().subscribe({
      next: types => this.appointmentTypes.set(types),
    })
  }

  onSelectedArea(area: Area) {
    this.areaService.getActiveProfessionalsFromArea(area).subscribe({
      next: professionals => {
        this.professionalsByArea.set(professionals);
      }
    });
  }
}
