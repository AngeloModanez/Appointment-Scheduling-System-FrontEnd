import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Area } from '@models/area';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  private http = inject(HttpClient);

  baseUrl = "http://localhost:3000/areas";

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(this.baseUrl);
  }
}
