import { Client } from "@models/client";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http = inject(HttpClient);

  baseUrl = "http://localhost:3000/clients"

  getClients(nameFilter: string, page: number): Observable<HttpResponse<Client[]>> {
    let url = `${this.baseUrl}?name_like=${nameFilter}&_page=${page}`;
    return this.http.get<Client[]>(url, { observe: 'response' });
  }

  delete(client: Client): Observable<void> {
    let url = `${this.baseUrl}/${client.id}`;
    return this.http.delete<void>(url);
  }
}
