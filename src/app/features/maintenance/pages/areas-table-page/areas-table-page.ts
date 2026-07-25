import { Component, effect, inject, signal } from '@angular/core';
import { AreaService } from '@services/area-service';
import { PageLayout } from "@components/page-layout/page-layout";
import { Button } from "@components/button/button";
import { SearchInput } from "@components/search-input/search-input";
import { Page } from '@models/page';
import { Area } from '@models/area';
import { Table } from "@components/table/table";
import { SortButton } from "@components/sort-button/sort-button";
import { NgbPagination } from "@ng-bootstrap/ng-bootstrap";
import { Card } from "@components/card/card";

@Component({
  selector: 'app-areas-table-page',
  imports: [PageLayout, Button, SearchInput, Table, SortButton, NgbPagination, Card],
  templateUrl: './areas-table-page.html',
  styles: ``,
})
export class AreasTablePage {
  private areaService = inject(AreaService);

  form: any;

  areaPage = signal<Page<Area>>({
    content: [],
    totalElements: 0
  })

  filter = signal('');
  page = signal(1);
  sort = signal('id');

  constructor() {
    effect(() => {
      const filter = this.filter();
      const page = this.page();
      const sort = this.sort();

      this.loadAreas(filter, page, sort);
    });
  }

  loadAreas(filter: string, page: number, sort: string) {
    this.areaService.getAreasPage(filter, page, sort).subscribe({
      next: response => {
        this.areaPage.set({
          content: response.body ?? [],
          totalElements: parseInt(response.headers.get("X-Total-Count") || "0"),
        })
      }
    })
  }

  filterAreas(value: string) {
    this.filter.set(value);
    this.page.set(1);
  }
}
