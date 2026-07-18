import { Routes } from "@angular/router";
import { ScheduleAppointmentPage } from "./pages/schedule-appointment-page/schedule-appointment-page";
import { CancelAppointmentPage } from "./pages/cancel-appointment-page/cancel-appointment-page";
import { ClientHistoryPage } from "./pages/client-history-page/client-history-page";
import { ProfessionalSchedulePage } from "./pages/professional-schedule-page/professional-schedule-page";
import { TodayAppointmentsPage } from "./pages/today-appointments-page/today-appointments-page";


export const SCHEDULE_ROUTES: Routes = [
  {
    path: 'today',
    component: TodayAppointmentsPage
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
