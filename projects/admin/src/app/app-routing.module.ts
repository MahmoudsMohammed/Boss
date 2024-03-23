import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { loginComponent } from './features/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: loginComponent,
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./features/Tasks/Tasks.module').then((m) => m.TasksModule),
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
