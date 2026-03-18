import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Client } from '@models/client';
import { ClientService } from '@services/client-service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap/pagination';
import { PageLayout } from '@components/page-layout/page-layout';
import { Router } from '@angular/router';
import { SearchInput } from '@components/search-input/search-input';
import { Table } from '@components/table/table';
import { Page } from '@models/page';

@Component({
  selector: 'app-client-table-page',
  imports: [DatePipe, FormsModule, NgbPagination, PageLayout, SearchInput, Table],
  templateUrl: './client-table-page.html',
  styles: ``,
})
export class ClientTablePage implements OnInit {

  private router = inject(Router);
  private clientService = inject(ClientService);

  clientPage = signal<Page<Client>>({
    content: [],
    totalElements: 0
  });

  page = signal(1);
  filter = signal('');

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients(this.filter(), this.page()).subscribe({
      next: response => {
        this.clientPage.set({
          content: response.body ?? [],
          totalElements: parseInt(response.headers.get("X-Total-Count") || "0")
        });
      }
    });
  }

  pageChange() {
    this.loadClients();
  }

  filterClients(value: string) {
    this.filter.set(value);
    this.page.set(1);
    this.loadClients();
  }

  goToNewClient() {
    this.router.navigate(['/']);
  }
}
