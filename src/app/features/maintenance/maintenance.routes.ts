import { Routes } from "@angular/router";
import { ProfessionalPage } from "./pages/professional-page/professional-page";
import { AppointmentTypePage } from "./pages/appointment-type-page/appointment-type-page";
import { ClientsTablePage } from "./pages/clients-table-page/clients-table-page";
import { UserPage } from "./pages/user-page/user-page";
import { ClientFormPage } from "./pages/client-form-page/client-form-page";
import { AreasTablePage } from "./pages/areas-table-page/areas-table-page";

export const MAINTENANCE_ROUTES: Routes = [
  {
    path: 'areas-table',
    component: AreasTablePage
  },
  {
    path: 'professionals',
    component: ProfessionalPage
  },
  {
    path: 'types',
    component: AppointmentTypePage
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
    path: 'users',
    component: UserPage
  }
];
