import { Client } from "@models/client";
import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private http = inject(HttpClient);

  baseUrl = "http://localhost:3000/clients"

  getClients(clientNameFilter: string): Observable<Client[]> {
    let url = `${this.baseUrl}?name_like=${clientNameFilter}`;
    return this.http.get<Client[]>(url);
  }
}
