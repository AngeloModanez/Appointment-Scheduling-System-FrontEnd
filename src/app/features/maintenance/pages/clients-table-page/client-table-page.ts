import { Component } from '@angular/core';
import { Table } from "../../../../shared/components/table/table";
import { TableSearchInput } from '../../../../shared/components/table-search-input/table-search-input';

@Component({
  selector: 'app-client-table-page',
  imports: [Table, TableSearchInput],
  templateUrl: './client-table-page.html',
  styles: ``,
})
export class ClientTablePage {

  filterClients(term: string) {
    console.log(term);
  }
}
