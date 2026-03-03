import { Routes } from "@angular/router";
import { TodayAppointmentPage } from "./pages/today-appointment-page/today-appointment-page";
import { ScheduleAppointmentPage } from "./pages/schedule-appointment-page/schedule-appointment-page";
import { CancelAppointmentPage } from "./pages/cancel-appointment-page/cancel-appointment-page";
import { ClientHistoryPage } from "./pages/client-history-page/client-history-page";
import { ProfessionalSchedulePage } from "./pages/professional-schedule-page/professional-schedule-page";

export const SCHEDULE_ROUTES: Routes = [
  {
    path: 'today-appointment',
    component: TodayAppointmentPage
  },
  {
    path: 'schedule-appointment',
    component: ScheduleAppointmentPage
  },
  {
    path: 'cancel-appointment',
    component: CancelAppointmentPage
  },
  {
    path: 'client-history',
    component: ClientHistoryPage
  },
  {
    path: 'professional-schedule',
    component: ProfessionalSchedulePage
  }
];
