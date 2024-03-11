import { NgModule } from '@angular/core';
import { materialModule } from '../../Material/materila.module';
import { authRoutingModule } from './auth.routing.module';
import { loginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [loginComponent],
  imports: [materialModule, authRoutingModule, ReactiveFormsModule],
})
export class authModule {}
