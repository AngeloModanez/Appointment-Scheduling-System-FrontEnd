import { Component } from '@angular/core';
import { Table } from "../../../../shared/components/table/table";
import { TableSearchInput } from '../../../../shared/components/table-search-input/table-search-input';
import { Router } from '@angular/router';
import { PageLayout } from "../../../../shared/components/page-layout/page-layout";

@Component({
  selector: 'app-client-table-page',
  imports: [Table, TableSearchInput, PageLayout],
  templateUrl: './client-table-page.html',
  styles: ``,
})
export class ClientTablePage {

  constructor(private router: Router) { }

  goToNewClient() {
    this.router.navigate(['/']);
  }

  filterClients(term: string) {
    console.log(term);
  }
}
