import { HttpClient, HttpResponse } from '@angular/common/http';
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

  getAppointmentTypePage(nameFilter: string, page: number, sort: string): Observable<HttpResponse<AppointmentType[]>> {
    let url = `${this.baseUrl}?type_like=${nameFilter}&_page=${page}&_limit=10&_sort=${sort}`
    return this.http.get<AppointmentType[]>(url, { observe: 'response' });
  }

}
