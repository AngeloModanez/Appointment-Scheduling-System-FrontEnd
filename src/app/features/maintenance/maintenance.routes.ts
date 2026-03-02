import { Routes } from "@angular/router";
import { AreaPage } from "./pages/area-page/area-page";
import { ProfessionalPage } from "./pages/professional-page/professional-page";
import { AppointmentTypePage } from "./pages/appointment-type-page/appointment-type-page";
import { ClientPage } from "./pages/client-page/client-page";

export const MAINTENANCE_ROUTES: Routes = [
  {
    path: 'area',
    component: AreaPage
  },
  {
    path: 'professional',
    component: ProfessionalPage
  },
  {
    path: 'appointment-type',
    component: AppointmentTypePage
  },
  {
    path: 'client',
    component: ClientPage
  },
]
