import { Component, effect, inject, signal } from '@angular/core';
import { Client } from '@models/client';
import { ClientService } from '@services/client-service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap/pagination';
import { PageLayout } from '@components/page-layout/page-layout';
import { Page } from '@models/page';
import { SearchInput } from '@components/search-input/search-input';
import { SortButton } from '@components/sort-button/sort-button';
import { Table } from '@components/table/table';
import { Button } from "@components/button/button";
import { Card } from "@components/card/card";
import { RouterLink } from "@angular/router";
import { ToastService } from '@services/toast-service';

@Component({
  selector: 'app-client-table-page',
  imports: [DatePipe, FormsModule, NgbPagination, PageLayout, SearchInput, SortButton, Table, Button, Card, RouterLink],
  templateUrl: './clients-table-page.html',
  styles: ``,
})
export class ClientsTablePage {

  private clientService = inject(ClientService);
  private toastService = inject(ToastService);

  form = '/management/client-form'

  clientPage = signal<Page<Client>>({
    content: [],
    totalElements: 0
  });

  filter = signal('');
  page = signal(1);
  sort = signal('id');

  constructor() {
    effect(() => {
      const filter = this.filter();
      const page = this.page();
      const sort = this.sort();

      this.clientService.getClients(filter, page, sort).subscribe({
        next: response => {
          this.clientPage.set({
            content: response.body ?? [],
            totalElements: parseInt(response.headers.get("X-Total-Count") || "0")
          });
        }
      });
    })
  }

  loadClients() {
    this.clientService.getClients(this.filter(), this.page(), this.sort()).subscribe({
      next: response => {
        this.clientPage.set({
          content: response.body ?? [],
          totalElements: parseInt(response.headers.get("X-Total-Count") || "0")
        });
      }
    });
  }

  deleteClient(client: Client) {
    this.clientService.delete(client).subscribe({
      next: () => {
        this.toastService.success(`${client.name} deleted successfully!`);
        this.loadClients();
      },
      error: () => this.toastService.error("Failed to delete client. Try again.")
    });
  }

  filterClients(value: string) {
    this.filter.set(value);
    this.page.set(1);
  }
}
