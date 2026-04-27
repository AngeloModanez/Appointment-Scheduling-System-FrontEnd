import { Routes } from "@angular/router";
import { ScheduleAppointmentPage } from "./pages/schedule-appointment-page/schedule-appointment-page";
import { CancelAppointmentPage } from "./pages/cancel-appointment-page/cancel-appointment-page";
import { ClientHistoryPage } from "./pages/client-history-page/client-history-page";
import { ProfessionalSchedulePage } from "./pages/professional-schedule-page/professional-schedule-page";
import { NewAppointment } from "./pages/new-appointment/new-appointment";

export const SCHEDULE_ROUTES: Routes = [
  {
    path: 'today',
    component: NewAppointment
  },
  {
    path: 'create',
    component: ScheduleAppointmentPage
  },
  {
    path: 'cancel',
    component: CancelAppointmentPage
  },
  {
    path: 'history',
    component: ClientHistoryPage
  },
  {
    path: 'professional',
    component: ProfessionalSchedulePage
  }
];
