import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home.routes')
        .then(r => r.HOME_ROUTES)
  },
  {
    path: 'management',
    loadChildren: () =>
      import('./features/maintenance/maintenance.routes')
        .then(r => r.MAINTENANCE_ROUTES)
  },
  {
    path: 'schedule',
    loadChildren: () =>
      import('./features/schedule/schedule.routes')
        .then(r => r.SCHEDULE_ROUTES)
  }
];
