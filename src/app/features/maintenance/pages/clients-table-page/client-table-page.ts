import { Component, inject, OnInit, signal } from '@angular/core';
import { Client } from '../../../../core/models/client';
import { ClientService } from '../../../../core/services/client-service';
import { FormsModule } from '@angular/forms';
import { PageLayout } from "../../../../shared/components/page-layout/page-layout";
import { Router } from '@angular/router';
import { SearchInput } from '../../../../shared/components/search-input/search-input';
import { Table } from "../../../../shared/components/table/table";

@Component({
  selector: 'app-client-table-page',
  imports: [ FormsModule, PageLayout, SearchInput, Table],
  templateUrl: './client-table-page.html',
  styles: ``,
})
export class ClientTablePage implements OnInit {

  private router = inject(Router);
  private clientService = inject(ClientService);

  clients = signal<Client[]>([]);
  filter = signal('');

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients('').subscribe(client => {
      this.clients.set(client);
    });
  }

  goToNewClient() {
    this.router.navigate(['/']);
  }
}
