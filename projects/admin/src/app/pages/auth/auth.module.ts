import { NgModule } from '@angular/core';
import { materialModule } from '../../Material/materila.module';
import { authRoutingModule } from './auth.routing.module';
import { loginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [loginComponent],
  imports: [
    materialModule,
    authRoutingModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class authModule {}
