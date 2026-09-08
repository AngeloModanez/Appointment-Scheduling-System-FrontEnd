import { Routes } from "@angular/router";
import { ClientsTablePage } from "./pages/clients-table-page/clients-table-page";
import { UserPage } from "./pages/user-page/user-page";
import { ClientFormPage } from "./pages/client-form-page/client-form-page";
import { AreasTablePage } from "./pages/areas-table-page/areas-table-page";
import { AreaFormPage } from "./pages/area-form-page/area-form-page";
import { AppointmentTypesTablePage } from "./pages/appointment-types-table-page/appointment-types-table-page";
import { AppointmentTypeFormPage } from "./pages/appointment-type-form-page/appointment-type-form-page";
import { ProfessionalsTablePage } from "./pages/professionals-table-page/professionals-table-page";
import { ProfessionalFormPage } from "./pages/professional-form-page/professional-form-page";

export const MAINTENANCE_ROUTES: Routes = [
  {
    path: 'areas-table',
    component: AreasTablePage
  },
  {
    path: 'area-form',
    component: AreaFormPage
  },
  {
    path: 'area-form/:id',
    component: AreaFormPage
  },
  {
    path: 'appointment-types-table',
    component: AppointmentTypesTablePage
  },
  {
    path: 'appointment-type-form',
    component: AppointmentTypeFormPage
  },
  {
    path: 'appointment-type-form/:id',
    component: AppointmentTypeFormPage
  },
  {
    path: 'clients-table',
    component: ClientsTablePage
  },
  {
    path: 'client-form',
    component: ClientFormPage
  },
  {
    path: 'client-form/:id',
    component: ClientFormPage
  },
  {
    path: 'professionals-table',
    component: ProfessionalsTablePage
  },
  {
    path: 'professional-form',
    component: ProfessionalFormPage
  },
  {
    path: 'professional-form/:id',
    component: ProfessionalFormPage
  },
  {
    path: 'users',
    component: UserPage
  }
];
