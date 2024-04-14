import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { loginComponent } from './features/login/login.component';
import { authGuard } from './core/Guards/auth.guard.services';

const routes: Routes = [
  {
    path: 'login',
    component: loginComponent,
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./features/Tasks/Tasks.module').then((m) => m.TasksModule),
    canActivate: [authGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./features/Users/Users.module').then((m) => m.UsersModule),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
