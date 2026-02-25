import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'appointments',
    loadComponent: () =>
      import('./features/appointments/pages/home/home')
        .then(m => m.default)
  },
  {
    path: '',
    redirectTo: 'appointments',
    pathMatch: 'full'
  }
];
