import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from '../../core/Guards/auth.guard.services';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'tasks',
        loadChildren: () =>
          import('./Tasks/Tasks.module').then((m) => m.TasksModule),
        canActivate: [authGuard],
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./Users/Users.module').then((m) => m.UsersModule),
        canActivate: [authGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
