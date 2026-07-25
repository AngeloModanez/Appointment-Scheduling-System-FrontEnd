import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Area } from '@models/area';
import { Professional } from '@models/professional';
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

  getAreasPage(): Observable<HttpResponse<Area[]>> {
    return this.http.get<Area[]>(this.baseUrl, { observe: 'response' });
  }

  getProfessionalsFromArea(area: Area): Observable<Professional[]> {
    let url = `${this.baseUrl}/${area.id}/professionals`;
    return this.http.get<Professional[]>(url);
  }

  getActiveProfessionalsFromArea(area: Area): Observable<Professional[]> {
    let url = `${this.baseUrl}/${area.id}/professionals?active=true`;
    return this.http.get<Professional[]>(url);
  }
}
