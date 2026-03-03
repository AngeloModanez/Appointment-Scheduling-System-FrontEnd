import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/home/home.routes')
            .then(r => r.HOME_ROUTES)
      },
      {
        path: '',
        loadChildren: () =>
          import('./features/maintenance/maintenance.routes')
            .then(r => r.MAINTENANCE_ROUTES)
      }
    ]
  }
];
