import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Area } from '@models/area';
import { Professional } from '@models/professional';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  private http = inject(HttpClient);

  baseUrl = "http://localhost:3000/areas";

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(this.baseUrl);
  }

  getAreasPage(nameFilter: string, page: number, sort: string): Observable<HttpResponse<Area[]>> {
    let url = `${this.baseUrl}?name_like=${nameFilter}&_page=${page}&_limit=10&_sort=${sort}`
    return this.http.get<Area[]>(url, { observe: 'response' });
  }

  getAreaById(id: number): Observable<Area> {
    let url = `${this.baseUrl}/${id}`;
    return this.http.get<Area>(url);
  }

  getActiveProfessionalsFromArea(area: Area): Observable<Professional[]> {
    return this.http.get<Professional[]>('http://localhost:3000/professionals?active=true').pipe(
      map(professionals => professionals.filter(p => p.areasId.includes(area.id)))
    );
  }

  getProfessionalsFromArea(area: Area): Observable<Professional[]> {
    return this.http.get<Professional[]>('http://localhost:3000/professionals').pipe(
      map(professionals => professionals.filter(p => p.areasId.includes(area.id)))
    );
  }

  save(area: Area): Observable<void> {
    return this.http.post<void>(this.baseUrl, area);
  }

  update(area: Area): Observable<void> {
    let url = `${this.baseUrl}/${area.id}`;
    return this.http.put<void>(url, area);
  }

  delete(area: Area): Observable<void> {
    let url = `${this.baseUrl}/${area.id}`;
    return this.http.delete<void>(url);
  }
}
