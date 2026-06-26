import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Professional } from '@models/professional';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalService {
  private http = inject(HttpClient);

  baseUrl = "http://localhost:3000/professionals";

  getAvailableDays(professional: Professional, calendar: Date): Observable<number[]> {
    let month = calendar.getMonth() + 1;
    let year = calendar.getFullYear();
    let url = `${this.baseUrl}/${professional.id}/availability-days?year=${year}&month=${month}`;

    // TODO: replace this when backend available;
    // return this.http.get<number[]>(url);

    return of([1, 2, 3, 4, 5, 6, 7, 8, 9]); // Mock;
  }
}
