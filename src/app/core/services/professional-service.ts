import { Injectable } from '@angular/core';
import { Professional } from '@models/professional';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalService {
  getAvailableDays(professional: Professional, calendar: Date): Observable<number[]> {
    return of([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  }
}
