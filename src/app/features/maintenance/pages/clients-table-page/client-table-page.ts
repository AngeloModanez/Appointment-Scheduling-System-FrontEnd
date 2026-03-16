import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Client } from '@models/client';
import { ClientService } from '@services/client-service';
import { FormsModule } from '@angular/forms';
import { PageLayout } from '@components/page-layout/page-layout';
import { Router } from '@angular/router';
import { SearchInput } from '@components/search-input/search-input';
import { Table } from '@components/table/table';

@Component({
  selector: 'app-client-table-page',
  imports: [FormsModule, PageLayout, SearchInput, Table],
  templateUrl: './client-table-page.html',
  styles: ``,
})
export class ClientTablePage implements OnInit {

  private router = inject(Router);
  private clientService = inject(ClientService);

  clients = signal<Client[]>([]);
  filter = signal('');

  filteredClients = computed(() =>
    this.clients().filter(c =>
      c.name.toLowerCase().includes(this.filter().toLowerCase())
    )
  );

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients('').subscribe(client => {
      this.clients.set(client);
    });
  }

  delete(client: Client) {
    this.clientService.delete(client).subscribe(() => {
      this.clients.update(list => list.filter(c => c.id !== client.id));
    });
  }

  goToNewClient() {
    this.router.navigate(['/']);
  }
}
