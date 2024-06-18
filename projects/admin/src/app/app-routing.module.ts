import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { loginComponent } from './features/login/login.component';
import { authGuard } from './core/Guards/auth.guard.services';

const routes: Routes = [
  {
    path: 'login',
    component: loginComponent,
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
