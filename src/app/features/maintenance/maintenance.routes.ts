import { Routes } from "@angular/router";
import { AreaPage } from "./pages/area-page/area-page";
import { ProfessionalPage } from "./pages/professional-page/professional-page";
import { AppointmentTypePage } from "./pages/appointment-type-page/appointment-type-page";
import { ClientTablePage } from "./pages/clients-table-page/client-table-page";
import { UserPage } from "./pages/user-page/user-page";

export const MAINTENANCE_ROUTES: Routes = [
  {
    path: 'areas',
    component: AreaPage
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
    component: ClientTablePage
  },
  {
    path: 'users',
    component: UserPage
  }
];
