import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '@components/button/button';
import { Card } from '@components/card/card';
import { Modal } from '@components/modal/modal';
import { PageLayout } from '@components/page-layout/page-layout';
import { SearchInput } from '@components/search-input/search-input';
import { SortButton } from '@components/sort-button/sort-button';
import { Table } from '@components/table/table';
import { AppointmentType } from '@models/appointment-type';
import { Page } from '@models/page';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentTypeService } from '@services/appointment-type-service';
import { ToastService } from '@services/toast-service';

@Component({
  selector: 'app-appointment-types-table-page',
  imports: [PageLayout, Button, SearchInput, Table, SortButton, NgbPagination, Card, RouterLink, Modal],
  templateUrl: './appointment-types-table-page.html',
  styles: ``,
})
export class AppointmentTypesTablePage {
  private appointmentTypeService = inject(AppointmentTypeService);
  private toastService = inject(ToastService);

  form = '/management/appointment-type-form';

  appointmentTypePage = signal<Page<AppointmentType>>({
    content: [],
    totalElements: 0
  })

  filter = signal('');
  page = signal(1);
  sort = signal('id');

  selectedAppointmentType!: AppointmentType;

  constructor() {
    effect(() => {
      const filter = this.filter();
      const page = this.page();
      const sort = this.sort();

      this.loadAppointmentType(filter, page, sort);
    });
  }

  loadAppointmentType(filter: string, page: number, sort: string) {
    this.appointmentTypeService.getAppointmentTypePage(filter, page, sort).subscribe({
      next: response => {
        this.appointmentTypePage.set({
          content: response.body ?? [],
          totalElements: parseInt(response.headers.get("X-Total-Count") || "0"),
        })
      }
    })
  }

  deleteAppointmentType(appointmentType: AppointmentType, modalConfirm: Modal) {
    this.selectedAppointmentType = appointmentType;
    modalConfirm.open().then(confirm => {
      if (confirm) {
        this.appointmentTypeService.delete(appointmentType).subscribe({
          next: () => {
            this.toastService.success(`${appointmentType.type} deleted successfully!`);
            this.loadAppointmentType(this.filter(), this.page(), this.sort());
          },
          error: () => this.toastService.error("Failed to delete appointment type. Try again.")
        });
      }
    }).catch(() => { });
  }

  filterAppointmentType(value: string) {
    this.filter.set(value);
    this.page.set(1);
  }
}
