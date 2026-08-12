import { Component, effect, inject, signal } from '@angular/core';
import { PageLayout } from "@components/page-layout/page-layout";
import { Button } from "@components/button/button";
import { SearchInput } from "@components/search-input/search-input";
import { ProfessionalService } from '@services/professional-service';
import { Professional } from '@models/professional';
import { Page } from '@models/page';
import { Table } from "@components/table/table";
import { SortButton } from "@components/sort-button/sort-button";
import { RouterLink } from '@angular/router';
import { NgbPagination } from "@ng-bootstrap/ng-bootstrap";
import { Card } from "@components/card/card";
import { Modal } from "@components/modal/modal";
import { ToastService } from '@services/toast-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-professionals-table-page',
  imports: [PageLayout, Button, SearchInput, Table, SortButton, RouterLink, NgbPagination, Card, Modal, FormsModule],
  templateUrl: './professionals-table-page.html',
  styles: ``,
})
export class ProfessionalsTablePage {
  private professionalService = inject(ProfessionalService);
  private toastService = inject(ToastService);

  form = '/management/professional-form'

  professionalPage = signal<Page<Professional>>({
    content: [],
    totalElements: 0
  });

  filter = signal('');
  page = signal(1);
  sort = signal('id');

  selectedProfessional!: Professional;

  constructor() {
    effect(() => {
      const filter = this.filter();
      const page = this.page();
      const sort = this.sort();

      this.loadProfessionals(filter, page, sort);
    })
  }

  loadProfessionals(filter: string, page: number, sort: string) {
    this.professionalService.getProfessionalPage(filter, page, sort).subscribe({
      next: response => {
        this.professionalPage.set({
          content: response.body ?? [],
          totalElements: parseInt(response.headers.get("X-Total-Count") || "0"),
        });
      }
    });
  }

  deleteProfessional(professional: Professional, modalConfirm: Modal) {
    this.selectedProfessional = professional;
    modalConfirm.open().then(confirm => {
      if (confirm) {
        this.professionalService.delete(professional).subscribe({
          next: () => {
            this.toastService.success(`${professional.name} deleted successfully!`);
            this.loadProfessionals(this.filter(), this.page(), this.sort());
          },
          error: () => this.toastService.error("Failed to delete professional. Try again.")
        });
      }
    }).catch(() => { });
  }

  filterProfessionals(value: string) {
    this.filter.set(value);
    this.page.set(1);
  }
}
