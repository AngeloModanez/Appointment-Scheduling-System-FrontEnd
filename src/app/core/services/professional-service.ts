import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TimeModel } from '@features/schedule/components/time/models/time-model';
import { Professional } from '@models/professional';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalService {
  private http = inject(HttpClient);

  baseUrl = "http://localhost:3000/professionals";

  getProfessionalPage(nameFilter: string, page: number, sort: string): Observable<HttpResponse<Professional[]>> {
    let url = `${this.baseUrl}?name_like=${nameFilter}&_page=${page}&_limit=10&_sort=${sort}`;

    if (sort === 'active') {
      url = `${url}&_order=desc`;
    }

    return this.http.get<Professional[]>(url, { observe: 'response' });
  }

  getProfessionalById(id: number): Observable<Professional> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.get<Professional>(url);
  }

  save(professional: Professional): Observable<void> {
    return this.http.post<void>(this.baseUrl, professional);
  }

  update(professional: Professional): Observable<void> {
    let url = `${this.baseUrl}/${professional.id}`;
    return this.http.put<void>(url, professional);
  }

  delete(professional: Professional): Observable<void> {
    let url = `${this.baseUrl}/${professional.id}`;
    return this.http.delete<void>(url);
  }

  getAvailableDays(professional: Professional, calendar: Date): Observable<number[]> {
    let month = calendar.getMonth() + 1;
    let year = calendar.getFullYear();
    let url = `${this.baseUrl}/${professional.id}/availability-days?year=${year}&month=${month}`;

    // TODO: replace this when backend available;
    // return this.http.get<number[]>(url);

    return of([
      Math.floor(Math.random() * 20) + 1,
      Math.floor(Math.random() * 20) + 1,
      Math.floor(Math.random() * 20) + 1,
      Math.floor(Math.random() * 20) + 1,
      Math.floor(Math.random() * 20) + 1,
      Math.floor(Math.random() * 20) + 1,
    ]); // Mock;
  }

  getAvailableTimes(professional: Professional, selectedDate: Date): Observable<TimeModel[]> {
    let date = selectedDate;
    let url = `${this.baseUrl}/${professional.id}/availability-times?date=${date}`;

    // TODO: replace this when backend available;
    // return this.http.get<TimeModel[]>(url);

    return of([
      { startTime: "08:00:00", endTime: "08:30:00", available: Math.random() >= 0.5 },
      { startTime: "08:30:00", endTime: "09:00:00", available: Math.random() >= 0.5 },
      { startTime: "09:00:00", endTime: "09:30:00", available: Math.random() >= 0.5 },
      { startTime: "09:30:00", endTime: "10:00:00", available: Math.random() >= 0.5 },
      { startTime: "10:00:00", endTime: "10:30:00", available: Math.random() >= 0.5 },
      { startTime: "10:30:00", endTime: "11:00:00", available: Math.random() >= 0.5 },
      { startTime: "11:00:00", endTime: "11:30:00", available: Math.random() >= 0.5 },
      { startTime: "11:30:00", endTime: "12:00:00", available: Math.random() >= 0.5 },
      { startTime: "14:00:00", endTime: "14:30:00", available: Math.random() >= 0.5 },
      { startTime: "14:30:00", endTime: "15:00:00", available: Math.random() >= 0.5 },
      { startTime: "15:00:00", endTime: "15:30:00", available: Math.random() >= 0.5 },
      { startTime: "15:30:00", endTime: "16:00:00", available: Math.random() >= 0.5 },
      { startTime: "16:00:00", endTime: "16:30:00", available: Math.random() >= 0.5 },
      { startTime: "16:30:00", endTime: "17:00:00", available: Math.random() >= 0.5 },
      { startTime: "17:00:00", endTime: "17:30:00", available: Math.random() >= 0.5 },
      { startTime: "17:30:00", endTime: "18:00:00", available: Math.random() >= 0.5 }
    ]); // Mock;
  }
}
