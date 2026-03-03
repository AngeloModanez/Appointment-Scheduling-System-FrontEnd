import { Routes } from "@angular/router";
import { TodayAppointmentPage } from "./pages/today-appointment-page/today-appointment-page";
import { ScheduleAppointmentPage } from "./pages/schedule-appointment-page/schedule-appointment-page";

export const SCHEDULE_ROUTES: Routes = [
  {
    path: 'today-appointment',
    component: TodayAppointmentPage
  },
  {
    path: 'schedule-appointment',
    component: ScheduleAppointmentPage
  }
]
