import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('../app/features/authentication/authentication.routing').then(
        (e) => e.routes
      ),
  },
  { path: '**', redirectTo: 'auth/login', pathMatch: 'full' },
];
