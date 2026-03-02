import { Routes } from "@angular/router";
import { AreaPage } from "./pages/area-page/area-page";
import { ProfessionalPage } from "./pages/professional-page/professional-page";

export const MAINTENANCE_ROUTES: Routes = [
  {
    path: 'area',
    component: AreaPage
  },
  {
    path: 'professional',
    component: ProfessionalPage
  },
]
