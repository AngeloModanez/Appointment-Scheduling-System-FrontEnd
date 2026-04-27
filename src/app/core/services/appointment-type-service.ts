import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppointmentType } from '@models/appointment-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentTypeService {
  http = inject(HttpClient)

  baseUrl = "http://localhost:3000/appointment-types";

  getAppointmentTypes(): Observable<AppointmentType[]> {
    return this.http.get<AppointmentType[]>(this.baseUrl);
  }
}
